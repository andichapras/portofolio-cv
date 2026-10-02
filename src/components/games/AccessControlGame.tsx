import { useEffect, useState } from 'react';
import {
  actions,
  roles,
  scopes,
  scenarios,
  createInitialPolicy,
  evaluatePolicy,
  type Action,
  type Role,
  type Scope,
} from '@/lib/games/access-control';
import './access-control.css';
import { translate, type Locale } from '@/lib/i18n';

export default function AccessControlGame({ locale = 'en' }: { locale?: Locale }) {
  const t = translate(locale);
  const roleDescriptions = {
    agent: t('Works with their own records.', 'Bekerja dengan data milik sendiri.'),
    manager: t('Oversees their branch.', 'Mengawasi cabangnya.'),
    auditor: t('Reviews across branches.', 'Memeriksa data lintas cabang.'),
  };
  const roleLabels: Record<Role, string> = {
    agent: t('Agent', 'Agen'),
    manager: t('Manager', 'Manajer'),
    auditor: 'Auditor',
  };
  const actionLabels: Record<Action, string> = {
    read: t('Read', 'Baca'),
    edit: t('Edit', 'Ubah'),
    approve: t('Approve', 'Setujui'),
  };
  const scopeLabels: Record<Scope, string> = {
    none: t('No access', 'Tanpa akses'),
    own: t('Own records', 'Data milik sendiri'),
    branch: t('Same branch (including own)', 'Satu cabang (termasuk milik sendiri)'),
    all: t('All branches', 'Semua cabang'),
  };

  // Translate scenario descriptions without changing the evaluator or its stable IDs.
  const scenarioLabels = Object.fromEntries(
    scenarios.map(({ id, request }) => {
      const relationship =
        request.actor.id === request.record.ownerId
          ? t('own record', 'data milik sendiri')
          : request.actor.branch === request.record.branch
            ? t('colleague’s record, same branch', 'data rekan satu cabang')
            : t('record from another branch', 'data cabang lain');
      return [
        id,
        `${roleLabels[request.actor.role]} / ${actionLabels[request.action]} / ${relationship}`,
      ];
    }),
  );
  const accessLabel = (allowed: boolean) => (allowed ? t('allow', 'izinkan') : t('deny', 'tolak'));

  // 1. Enable controls after hydration; the first render also runs on the server.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const [policy, setPolicy] = useState(createInitialPolicy);
  const [report, setReport] = useState<ReturnType<typeof evaluatePolicy> | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [notice, setNotice] = useState(
    t(
      'Choose your permissions, then run the checks.',
      'Pilih izin akses, lalu jalankan pemeriksaan.',
    ),
  );

  // 2. Update one permission without mutating state, then discard the outdated result.
  const updatePermission = (role: Role, action: Action, scope: Scope) => {
    setPolicy((current) => ({
      ...current,
      permissions: {
        ...current.permissions,
        [role]: { ...current.permissions[role], [action]: scope },
      },
    }));
    setReport(null);
    setNotice(
      t(
        'Policy changed. Run the checks to evaluate it.',
        'Aturan berubah. Jalankan pemeriksaan untuk mengevaluasinya.',
      ),
    );
  };

  // 3. Evaluate the policy locally; announce a short summary for screen readers.
  const run = () => {
    const next = evaluatePolicy(policy);
    setReport(next);
    setAttempts((count) => count + 1);
    setNotice(
      next.passed === next.total
        ? t(
            'All 27 checks passed. Your policy matches every rule in this simulation.',
            'Semua 27 pemeriksaan lulus. Aturanmu sesuai dengan seluruh ketentuan simulasi ini.',
          )
        : t(
            `${next.passed} of ${next.total} checks passed. Review the mismatches and try again.`,
            `${next.passed} dari ${next.total} pemeriksaan lulus. Tinjau ketidaksesuaian dan coba lagi.`,
          ),
    );
  };

  const reset = () => {
    setPolicy(createInitialPolicy());
    setReport(null);
    setAttempts(0);
    setNotice(
      t(
        'Reset complete. All permissions are back to no access.',
        'Reset selesai. Semua izin kembali menjadi tanpa akses.',
      ),
    );
  };

  const failures = report?.results.filter((result) => !result.passed) ?? [];

  return (
    <div className="access-game" data-game-ready={ready}>
      <div className="access-toolbar">
        <span>{t('POLICY EDITOR', 'EDITOR ATURAN')} / v1</span>
        <span>
          {t('Runs:', 'Percobaan:')} {attempts}
        </span>
      </div>
      <div className="access-roles">
        {roles.map((role) => (
          <fieldset key={role} className="access-role" disabled={!ready}>
            <legend>{roleLabels[role]}</legend>
            <p>{roleDescriptions[role]}</p>
            {actions.map((action) => (
              <label key={action} htmlFor={`${role}-${action}`}>
                <span>{actionLabels[action]}</span>
                <select
                  id={`${role}-${action}`}
                  value={policy.permissions[role][action]}
                  onChange={(event) => updatePermission(role, action, event.target.value as Scope)}
                >
                  {scopes.map((scope) => (
                    <option key={scope} value={scope}>
                      {scopeLabels[scope]}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </fieldset>
        ))}
      </div>
      <label className="access-safeguard">
        <input
          type="checkbox"
          disabled={!ready}
          checked={policy.preventSelfApproval}
          onChange={(event) => {
            setPolicy((current) => ({
              ...current,
              preventSelfApproval: event.target.checked,
            }));
            setReport(null);
            setNotice(
              t(
                'Safeguard changed. Run the checks again.',
                'Pengaman berubah. Jalankan pemeriksaan lagi.',
              ),
            );
          }}
        />
        <span>
          <strong>{t('Prevent self-approval', 'Cegah persetujuan data sendiri')}</strong>
          <small>
            {t(
              'Nobody can approve a record they own, even when their scope includes it.',
              'Tidak ada yang boleh menyetujui data sendiri, meskipun cakupan aksesnya mengizinkan.',
            )}
          </small>
        </span>
      </label>
      <div className="access-actions">
        <button type="button" disabled={!ready} className="button" onClick={run}>
          {t('Run 27 checks', 'Jalankan 27 pemeriksaan')} ↗
        </button>
        <button type="button" disabled={!ready} className="button secondary" onClick={reset}>
          {t('Reset policy', 'Reset aturan')}
        </button>
      </div>
      <div
        className={`access-result ${report && report.passed === report.total ? 'is-success' : ''}`}
      >
        <p role="status" aria-live="polite" aria-atomic="true">
          {ready
            ? notice
            : t(
                'Waiting for interactive controls. JavaScript is required to play.',
                'Menunggu kontrol interaktif. JavaScript diperlukan untuk bermain.',
              )}
        </p>
        {report && (
          <progress
            aria-label={t('Passing access checks', 'Pemeriksaan akses yang lulus')}
            value={report.passed}
            max={report.total}
          />
        )}
      </div>

      {/* 4. Show actionable mismatches first; keep the complete report expandable. */}
      {failures.length > 0 && (
        <section
          className="access-feedback"
          aria-label={t('Policy mismatches', 'Ketidaksesuaian aturan')}
        >
          <h2>{t('What needs adjusting', 'Yang perlu disesuaikan')}</h2>
          <ul>
            {failures.map((result) => (
              <li key={result.id}>
                <strong>
                  {result.expected
                    ? t('Too restrictive', 'Terlalu membatasi')
                    : t('Too much access', 'Akses berlebihan')}
                </strong>
                <span>{scenarioLabels[result.id] ?? result.label}</span>
                <small>
                  {t('Expected:', 'Seharusnya:')} {accessLabel(result.expected)} ·{' '}
                  {t('Your policy:', 'Aturanmu:')} {accessLabel(result.actual)}
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}
      {report && (
        <details className="access-details">
          <summary>
            {t(`Inspect all ${report.total} checks`, `Lihat semua ${report.total} pemeriksaan`)}
          </summary>
          <ul>
            {report.results.map((result) => (
              <li key={result.id}>
                <span>{result.passed ? t('PASS', 'LULUS') : t('FAIL', 'GAGAL')}</span>{' '}
                {scenarioLabels[result.id] ?? result.label} — {t('expected', 'seharusnya')}{' '}
                {accessLabel(result.expected)}, {t('received', 'hasil')}{' '}
                {accessLabel(result.actual)}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
