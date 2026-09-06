import { describe, expect, it } from 'vitest';
import { canAccess, createInitialPolicy, evaluatePolicy, expectedAccess, type AccessRequest, type Policy } from './access-control';

const solution: Policy = { permissions: {
  agent: { read: 'own', edit: 'own', approve: 'none' },
  manager: { read: 'branch', edit: 'none', approve: 'branch' },
  auditor: { read: 'all', edit: 'none', approve: 'none' },
}, preventSelfApproval: true };
const request = (role: AccessRequest['actor']['role'], action: AccessRequest['action'], ownerId = 'colleague', branch = 'Jakarta'): AccessRequest => ({ actor: { id: 'player', role, branch: 'Jakarta' }, record: { ownerId, branch }, action });

describe('Access Control Challenge', () => {
  it('accepts the least-privilege solution across all 27 scenarios', () => {
    const report = evaluatePolicy(solution);
    expect(report.total).toBe(27);
    expect(report.passed).toBe(27);
  });
  it('rejects deny-all because legitimate work must remain possible', () => {
    const report = evaluatePolicy(createInitialPolicy());
    expect(report.results.some((result) => result.expected && !result.actual)).toBe(true);
    expect(report.passed).toBeLessThan(report.total);
  });
  it('detects over-permission, not just missing permissions', () => {
    const policy = createInitialPolicy();
    policy.permissions.agent.read = 'all';
    expect(evaluatePolicy(policy).results.some((result) => !result.expected && result.actual)).toBe(true);
  });
  it('allows agents to read and edit only their own records, never approve', () => {
    expect(canAccess(solution, request('agent', 'read', 'player'))).toBe(true);
    expect(canAccess(solution, request('agent', 'edit', 'player'))).toBe(true);
    expect(canAccess(solution, request('agent', 'edit'))).toBe(false);
    expect(canAccess(solution, request('agent', 'approve', 'player'))).toBe(false);
  });
  it('allows branch managers to approve colleagues, not other branches or themselves', () => {
    expect(canAccess(solution, request('manager', 'approve'))).toBe(true);
    expect(canAccess(solution, request('manager', 'approve', 'other', 'Bandung'))).toBe(false);
    expect(canAccess(solution, request('manager', 'approve', 'player'))).toBe(false);
    expect(canAccess(solution, request('manager', 'edit'))).toBe(false);
  });
  it('detects the self-approval trap separately from branch scope', () => {
    const unsafe = { ...solution, preventSelfApproval: false };
    expect(canAccess(unsafe, request('manager', 'approve', 'player'))).toBe(true);
    expect(expectedAccess(request('manager', 'approve', 'player'))).toBe(false);
    expect(evaluatePolicy(unsafe).passed).toBe(26);
  });
  it('gives auditors cross-branch read access but no writes', () => {
    expect(canAccess(solution, request('auditor', 'read', 'other', 'Bandung'))).toBe(true);
    expect(canAccess(solution, request('auditor', 'edit', 'player'))).toBe(false);
    expect(canAccess(solution, request('auditor', 'approve'))).toBe(false);
  });
  it('creates independent reset policies and does not mutate them when evaluating', () => {
    const first = createInitialPolicy(); const second = createInitialPolicy();
    first.permissions.agent.read = 'all';
    expect(second.permissions.agent.read).toBe('none');
    const before = JSON.stringify(first); evaluatePolicy(first);
    expect(JSON.stringify(first)).toBe(before);
  });
});
