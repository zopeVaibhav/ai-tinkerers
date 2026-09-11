export enum Surface {
    Slack = "slack",
    Telegram = "telegram",
    Web = "web",
}

export enum Audience {
    Engineer = "engineer",
    Lead = "lead",
}

export enum Subsystem {
    Payments = "payments",
    Auth = "auth",
    Notifications = "notifications",
}

export enum Condition {
    GatewayTimeout = "gateway_timeout",
    RateLimited = "rate_limited",
    TokenExpired = "token_expired",
    DuplicateEvent = "duplicate_event",
}

export enum ClaimAction {
    HardFail = "hard_fail",
    RetrySilently = "retry_silently",
    QueueAndWarn = "queue_and_warn",
    LogOnly = "log_only",
}

export enum ConflictStatus {
    Open = "open",
    Acknowledged = "acknowledged",
    Resolved = "resolved",
}

export enum ActionType {
    Acknowledge = "acknowledge",
    Resolve = "resolve",
    Supersede = "supersede",
    Note = "note",
    Reframe = "reframe",
}

export enum Side {
    A = "a",
    B = "b",
}
