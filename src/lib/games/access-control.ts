export const roles = ['agent', 'manager', 'auditor'] as const;
export const actions = ['read', 'edit', 'approve'] as const;
export const scopes = ['none', 'own', 'branch', 'all'] as const;
export type Role = (typeof roles)[number];
export type Action = (typeof actions)[number];
export type Scope = (typeof scopes)[number];
export interface Policy {
  permissions: Record<Role, Record<Action, Scope>>;
  preventSelfApproval: boolean;
}
export interface AccessRequest {
  actor: { id: string; role: Role; branch: string };
  record: { ownerId: string; branch: string };
  action: Action;
}
// Start each attempt with no access; return a new object so reset state is independent.
export function createInitialPolicy(): Policy {
  return {
    permissions: {
      agent: { read: 'none', edit: 'none', approve: 'none' },
      manager: { read: 'none', edit: 'none', approve: 'none' },
      auditor: { read: 'none', edit: 'none', approve: 'none' },
    },
    preventSelfApproval: false,
  };
}
export function canAccess(policy: Policy, request: AccessRequest): boolean {
  const { actor, record, action } = request;
  // Explicit safety rules take priority over the selected access scope.
  if (action === 'approve' && policy.preventSelfApproval && actor.id === record.ownerId) {
    return false;
  }
  const scope = policy.permissions[actor.role][action];
  return (
    scope === 'all' ||
    (scope === 'own' && actor.id === record.ownerId) ||
    (scope === 'branch' && actor.branch === record.branch)
  );
}
// Keep the mission rules independent from the player's configurable policy.
export function expectedAccess({ actor, record, action }: AccessRequest): boolean {
  switch (actor.role) {
    case 'agent':
      return action !== 'approve' && actor.id === record.ownerId;
    case 'manager':
      return (
        actor.branch === record.branch &&
        (action === 'read' || (action === 'approve' && actor.id !== record.ownerId))
      );
    case 'auditor':
      return action === 'read';
  }
}
const relationships = [
  { label: 'own record', ownerId: 'player', branch: 'Jakarta' },
  { label: 'colleague’s record, same branch', ownerId: 'colleague', branch: 'Jakarta' },
  { label: 'record from another branch', ownerId: 'other', branch: 'Bandung' },
] as const;
// Cover every role/action/ownership combination: 3 × 3 × 3 checks.
export const scenarios = roles.flatMap((role) =>
  actions.flatMap((action) =>
    relationships.map((record, index) => ({
      id: `${role}-${action}-${index}`,
      label: `${role} / ${action} / ${record.label}`,
      request: {
        actor: { id: 'player', role, branch: 'Jakarta' },
        record: { ownerId: record.ownerId, branch: record.branch },
        action,
      } satisfies AccessRequest,
    })),
  ),
);
// Compare expected and actual access to identify both blocked work and unsafe grants.
export function evaluatePolicy(policy: Policy) {
  const results = scenarios.map((scenario) => {
    const actual = canAccess(policy, scenario.request);
    const expected = expectedAccess(scenario.request);
    return {
      id: scenario.id,
      label: scenario.label,
      actual,
      expected,
      passed: actual === expected,
    };
  });
  return {
    results,
    passed: results.filter((result) => result.passed).length,
    total: results.length,
  };
}
