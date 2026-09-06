import { useEffect, useState } from 'react';
import {
  actions,
  roles,
  scopes,
  createInitialPolicy,
  evaluatePolicy,
  type Action,
  type Role,
  type Scope,
} from '@/lib/games/access-control';
import './access-control.css';

const roleDescriptions = {
  agent: 'Works with their own records.',
  manager: 'Oversees their branch.',
  auditor: 'Reviews across branches.',
};

const scopeLabels: Record<Scope, string> = {
  none: 'No access',
  own: 'Own records',
  branch: 'Same branch (including own)',
  all: 'All branches',
};

export default function AccessControlGame() {
  // 1. Enable controls after hydration; the first render also runs on the server.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const [policy, setPolicy] = useState(createInitialPolicy);
  const [report, setReport] = useState<ReturnType<typeof evaluatePolicy> | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [notice, setNotice] = useState('Choose your permissions, then run the checks.');

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
    setNotice('Policy changed. Run the checks to evaluate it.');
  };

  // 3. Evaluate the policy locally; announce a short summary for screen readers.
  const run = () => {
    const next = evaluatePolicy(policy);
    setReport(next);
    setAttempts((count) => count + 1);
    setNotice(
      next.passed === next.total
        ? 'System secured! All 27 checks passed. Legitimate access works and unsafe access is blocked.'
        : `${next.passed} of ${next.total} checks passed. Review the mismatches and try again.`,
    );
  };

  const reset = () => {
    setPolicy(createInitialPolicy());
    setReport(null);
    setAttempts(0);
    setNotice('Reset complete. All permissions are back to no access.');
  };

  const failures = report?.results.filter((result) => !result.passed) ?? [];

  return (
    <div className="access-game">
      <div className="access-toolbar">
        <span>POLICY EDITOR / v1</span>
        <span>Runs: {attempts}</span>
      </div>
      <div className="access-roles">
        {roles.map((role) => (
          <fieldset key={role} className="access-role" disabled={!ready}>
            <legend>{role}</legend>
            <p>{roleDescriptions[role]}</p>
            {actions.map((action) => (
              <label key={action} htmlFor={`${role}-${action}`}>
                <span>{action}</span>
                <select
                  id={`${role}-${action}`}
                  value={policy.permissions[role][action]}
                  onChange={(event) =>
                    updatePermission(role, action, event.target.value as Scope)
                  }
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
            setNotice('Safeguard changed. Run the checks again.');
          }}
        />
        <span>
          <strong>Prevent self-approval</strong>
          <small>
            Nobody can approve a record they own, even when their scope includes it.
          </small>
        </span>
      </label>
      <div className="access-actions">
        <button type="button" disabled={!ready} className="button" onClick={run}>
          Run 27 checks ↗
        </button>
        <button type="button" disabled={!ready} className="button secondary" onClick={reset}>
          Reset policy
        </button>
      </div>
      <div className={`access-result ${report && report.passed === report.total ? 'is-success' : ''}`}>
        <p role="status" aria-live="polite" aria-atomic="true">
          {ready ? notice : 'Waiting for interactive controls. JavaScript is required to play.'}
        </p>
        {report && (
          <progress aria-label="Passing access checks" value={report.passed} max={report.total} />
        )}
      </div>

      {/* 4. Show actionable mismatches first; keep the complete report expandable. */}
      {failures.length > 0 && (
        <section className="access-feedback" aria-label="Policy mismatches">
          <h2>What needs adjusting</h2>
          <ul>
            {failures.map((result) => (
              <li key={result.id}>
                <strong>{result.expected ? 'Too restrictive' : 'Too much access'}</strong>
                <span>{result.label}</span>
                <small>
                  Expected: {result.expected ? 'allow' : 'deny'} · Your policy:{' '}
                  {result.actual ? 'allow' : 'deny'}
                </small>
              </li>
            ))}
          </ul>
        </section>
      )}
      {report && (
        <details className="access-details">
          <summary>Inspect all {report.total} checks</summary>
          <ul>
            {report.results.map((result) => (
              <li key={result.id}>
                <span>{result.passed ? 'PASS' : 'FAIL'}</span> {result.label} — expected{' '}
                {result.expected ? 'allow' : 'deny'}, received {result.actual ? 'allow' : 'deny'}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
