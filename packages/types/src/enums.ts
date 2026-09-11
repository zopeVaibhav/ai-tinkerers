export enum Surface {
    Slack = "slack",
    Telegram = "telegram",
    Web = "web",
}

export enum Audience {
    Engineer = "engineer",
    Lead = "lead",
    Customer = "customer",
}

export enum Severity {
    Low = "low",
    Medium = "medium",
    High = "high",
}

export enum Status {
    Triage = "triage",
    AwaitingApproval = "awaiting_approval",
    Approved = "approved",
    Resolved = "resolved",
}

export enum ActionType {
    Intake = "intake",
    Acknowledge = "acknowledge",
    Propose = "propose",
    Approve = "approve",
    Reject = "reject",
    Resolve = "resolve",
    Note = "note",
    Reframe = "reframe",
}
