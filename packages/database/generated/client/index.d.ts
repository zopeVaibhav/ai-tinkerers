/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Decision
 * What one thread concluded, as a structured claim.
 */
export type Decision = $Result.DefaultSelection<Prisma.$DecisionPayload>;
/**
 * Model Conflict
 * Two decisions that cannot both be true. This is the shared object: it renders
 * in both threads at once and updates in place on every surface.
 */
export type Conflict = $Result.DefaultSelection<Prisma.$ConflictPayload>;
/**
 * Model Event
 * Append-only. One row per applied action.
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>;
/**
 * Model View
 * The subscription table. One conflict maps to every live window onto it.
 * Web connections are not persisted; they die with the browser tab.
 */
export type View = $Result.DefaultSelection<Prisma.$ViewPayload>;

/**
 * Enums
 */
export namespace $Enums {
    export const Surface: {
        slack: "slack";
        telegram: "telegram";
        web: "web";
    };

    export type Surface = (typeof Surface)[keyof typeof Surface];

    export const Audience: {
        engineer: "engineer";
        lead: "lead";
    };

    export type Audience = (typeof Audience)[keyof typeof Audience];

    export const Subsystem: {
        payments: "payments";
        auth: "auth";
        notifications: "notifications";
    };

    export type Subsystem = (typeof Subsystem)[keyof typeof Subsystem];

    export const Condition: {
        gateway_timeout: "gateway_timeout";
        rate_limited: "rate_limited";
        token_expired: "token_expired";
        duplicate_event: "duplicate_event";
    };

    export type Condition = (typeof Condition)[keyof typeof Condition];

    export const ClaimAction: {
        hard_fail: "hard_fail";
        retry_silently: "retry_silently";
        queue_and_warn: "queue_and_warn";
        log_only: "log_only";
    };

    export type ClaimAction = (typeof ClaimAction)[keyof typeof ClaimAction];

    export const ConflictStatus: {
        open: "open";
        acknowledged: "acknowledged";
        resolved: "resolved";
    };

    export type ConflictStatus = (typeof ConflictStatus)[keyof typeof ConflictStatus];
}

export type Surface = $Enums.Surface;

export const Surface: typeof $Enums.Surface;

export type Audience = $Enums.Audience;

export const Audience: typeof $Enums.Audience;

export type Subsystem = $Enums.Subsystem;

export const Subsystem: typeof $Enums.Subsystem;

export type Condition = $Enums.Condition;

export const Condition: typeof $Enums.Condition;

export type ClaimAction = $Enums.ClaimAction;

export const ClaimAction: typeof $Enums.ClaimAction;

export type ConflictStatus = $Enums.ConflictStatus;

export const ConflictStatus: typeof $Enums.ConflictStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Decisions
 * const decisions = await prisma.decision.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    const U = "log" extends keyof ClientOptions
        ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
            ? Prisma.GetEvents<ClientOptions["log"]>
            : never
        : never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

    /**
     * ##  Prisma Client ʲˢ
     *
     * Type-safe database client for TypeScript & Node.js
     * @example
     * ```
     * const prisma = new PrismaClient()
     * // Fetch zero or more Decisions
     * const decisions = await prisma.decision.findMany()
     * ```
     *
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
     */

    constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
    $on<V extends U>(
        eventType: V,
        callback: (event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent) => void,
    ): PrismaClient;

    /**
     * Connect with the database
     */
    $connect(): $Utils.JsPromise<void>;

    /**
     * Disconnect from the database
     */
    $disconnect(): $Utils.JsPromise<void>;

    /**
     * Executes a prepared raw query and returns the number of affected rows.
     * @example
     * ```
     * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRaw<T = unknown>(
        query: TemplateStringsArray | Prisma.Sql,
        ...values: any[]
    ): Prisma.PrismaPromise<number>;

    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRaw<T = unknown>(
        query: TemplateStringsArray | Prisma.Sql,
        ...values: any[]
    ): Prisma.PrismaPromise<T>;

    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(
        arg: [...P],
        options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
    ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

    $transaction<R>(
        fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
        options?: {
            maxWait?: number;
            timeout?: number;
            isolationLevel?: Prisma.TransactionIsolationLevel;
        },
    ): $Utils.JsPromise<R>;

    $extends: $Extensions.ExtendsHook<
        "extends",
        Prisma.TypeMapCb<ClientOptions>,
        ExtArgs,
        $Utils.Call<
            Prisma.TypeMapCb<ClientOptions>,
            {
                extArgs: ExtArgs;
            }
        >
    >;

    /**
     * `prisma.decision`: Exposes CRUD operations for the **Decision** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Decisions
     * const decisions = await prisma.decision.findMany()
     * ```
     */
    get decision(): Prisma.DecisionDelegate<ExtArgs, ClientOptions>;

    /**
     * `prisma.conflict`: Exposes CRUD operations for the **Conflict** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Conflicts
     * const conflicts = await prisma.conflict.findMany()
     * ```
     */
    get conflict(): Prisma.ConflictDelegate<ExtArgs, ClientOptions>;

    /**
     * `prisma.event`: Exposes CRUD operations for the **Event** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Events
     * const events = await prisma.event.findMany()
     * ```
     */
    get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

    /**
     * `prisma.view`: Exposes CRUD operations for the **View** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Views
     * const views = await prisma.view.findMany()
     * ```
     */
    get view(): Prisma.ViewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
    export import DMMF = runtime.DMMF;

    export type PrismaPromise<T> = $Public.PrismaPromise<T>;

    /**
     * Validator
     */
    export import validator = runtime.Public.validator;

    /**
     * Prisma Errors
     */
    export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
    export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
    export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
    export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
    export import PrismaClientValidationError = runtime.PrismaClientValidationError;

    /**
     * Re-export of sql-template-tag
     */
    export import sql = runtime.sqltag;
    export import empty = runtime.empty;
    export import join = runtime.join;
    export import raw = runtime.raw;
    export import Sql = runtime.Sql;

    /**
     * Decimal.js
     */
    export import Decimal = runtime.Decimal;

    export type DecimalJsLike = runtime.DecimalJsLike;

    /**
     * Metrics
     */
    export type Metrics = runtime.Metrics;
    export type Metric<T> = runtime.Metric<T>;
    export type MetricHistogram = runtime.MetricHistogram;
    export type MetricHistogramBucket = runtime.MetricHistogramBucket;

    /**
     * Extensions
     */
    export import Extension = $Extensions.UserArgs;
    export import getExtensionContext = runtime.Extensions.getExtensionContext;
    export import Args = $Public.Args;
    export import Payload = $Public.Payload;
    export import Result = $Public.Result;
    export import Exact = $Public.Exact;

    /**
     * Prisma Client JS version: 6.19.3
     * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
     */
    export type PrismaVersion = {
        client: string;
    };

    export const prismaVersion: PrismaVersion;

    /**
     * Utility Types
     */

    export import Bytes = runtime.Bytes;
    export import JsonObject = runtime.JsonObject;
    export import JsonArray = runtime.JsonArray;
    export import JsonValue = runtime.JsonValue;
    export import InputJsonObject = runtime.InputJsonObject;
    export import InputJsonArray = runtime.InputJsonArray;
    export import InputJsonValue = runtime.InputJsonValue;

    /**
     * Types of the values used to represent different kinds of `null` values when working with JSON fields.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    namespace NullTypes {
        /**
         * Type of `Prisma.DbNull`.
         *
         * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
         *
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
         */
        class DbNull {
            private DbNull: never;
            private constructor();
        }

        /**
         * Type of `Prisma.JsonNull`.
         *
         * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
         *
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
         */
        class JsonNull {
            private JsonNull: never;
            private constructor();
        }

        /**
         * Type of `Prisma.AnyNull`.
         *
         * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
         *
         * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
         */
        class AnyNull {
            private AnyNull: never;
            private constructor();
        }
    }

    /**
     * Helper for filtering JSON entries that have `null` on the database (empty on the db)
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const DbNull: NullTypes.DbNull;

    /**
     * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const JsonNull: NullTypes.JsonNull;

    /**
     * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const AnyNull: NullTypes.AnyNull;

    type SelectAndInclude = {
        select: any;
        include: any;
    };

    type SelectAndOmit = {
        select: any;
        omit: any;
    };

    /**
     * Get the type of the value, that the Promise holds.
     */
    export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

    /**
     * Get the return type of a function which returns a Promise.
     */
    export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
        ReturnType<T>
    >;

    /**
     * From T, pick a set of properties whose keys are in the union K
     */
    type Prisma__Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };

    export type Enumerable<T> = T | Array<T>;

    export type RequiredKeys<T> = {
        [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
    }[keyof T];

    export type TruthyKeys<T> = keyof {
        [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
    };

    export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

    /**
     * Subset
     * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
     */
    export type Subset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    };

    /**
     * SelectSubset
     * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
     * Additionally, it validates, if both select and include are present. If the case, it errors.
     */
    export type SelectSubset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    } & (T extends SelectAndInclude
        ? "Please either choose `select` or `include`."
        : T extends SelectAndOmit
          ? "Please either choose `select` or `omit`."
          : {});

    /**
     * Subset + Intersection
     * @desc From `T` pick properties that exist in `U` and intersect `K`
     */
    export type SubsetIntersection<T, U, K> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    } & K;

    type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

    /**
     * XOR is needed to have a real mutually exclusive union type
     * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
     */
    type XOR<T, U> = T extends object
        ? U extends object
            ? (Without<T, U> & U) | (Without<U, T> & T)
            : U
        : T;

    /**
     * Is T a Record?
     */
    type IsObject<T extends any> =
        T extends Array<any>
            ? False
            : T extends Date
              ? False
              : T extends Uint8Array
                ? False
                : T extends BigInt
                  ? False
                  : T extends object
                    ? True
                    : False;

    /**
     * If it's T[], return T
     */
    export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

    /**
     * From ts-toolbelt
     */

    type __Either<O extends object, K extends Key> = Omit<O, K> &
        {
            // Merge all but K
            [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
        }[K];

    type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

    type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

    type _Either<O extends object, K extends Key, strict extends Boolean> = {
        1: EitherStrict<O, K>;
        0: EitherLoose<O, K>;
    }[strict];

    type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
        ? _Either<O, K, strict>
        : never;

    export type Union = any;

    type PatchUndefined<O extends object, O1 extends object> = {
        [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
    } & {};

    /** Helper Types for "Merge" **/
    export type IntersectOf<U extends Union> = (
        U extends unknown ? (k: U) => void : never
    ) extends (k: infer I) => void
        ? I
        : never;

    export type Overwrite<O extends object, O1 extends object> = {
        [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
    } & {};

    type _Merge<U extends object> = IntersectOf<
        Overwrite<
            U,
            {
                [K in keyof U]-?: At<U, K>;
            }
        >
    >;

    type Key = string | number | symbol;
    type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
    type AtStrict<O extends object, K extends Key> = O[K & keyof O];
    type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
    export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
        1: AtStrict<O, K>;
        0: AtLoose<O, K>;
    }[strict];

    export type ComputeRaw<A extends any> = A extends Function
        ? A
        : {
              [K in keyof A]: A[K];
          } & {};

    export type OptionalFlat<O> = {
        [K in keyof O]?: O[K];
    } & {};

    type _Record<K extends keyof any, T> = {
        [P in K]: T;
    };

    // cause typescript not to expand types and preserve names
    type NoExpand<T> = T extends unknown ? T : never;

    // this type assumes the passed object is entirely optional
    type AtLeast<O extends object, K extends string> = NoExpand<
        O extends unknown
            ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
              | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
            : never
    >;

    type _Strict<U, _U = U> = U extends unknown
        ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
        : never;

    export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
    /** End Helper Types for "Merge" **/

    export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

    /**
  A [[Boolean]]
  */
    export type Boolean = True | False;

    // /**
    // 1
    // */
    export type True = 1;

    /**
  0
  */
    export type False = 0;

    export type Not<B extends Boolean> = {
        0: 1;
        1: 0;
    }[B];

    export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
        ? 0 // anything `never` is false
        : A1 extends A2
          ? 1
          : 0;

    export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

    export type Or<B1 extends Boolean, B2 extends Boolean> = {
        0: {
            0: 0;
            1: 1;
        };
        1: {
            0: 1;
            1: 1;
        };
    }[B1][B2];

    export type Keys<U extends Union> = U extends unknown ? keyof U : never;

    type Cast<A, B> = A extends B ? A : B;

    export const type: unique symbol;

    /**
     * Used by group by
     */

    export type GetScalarType<T, O> = O extends object
        ? {
              [P in keyof T]: P extends keyof O ? O[P] : never;
          }
        : never;

    type FieldPaths<T, U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">> =
        IsObject<T> extends True ? U : T;

    type GetHavingFields<T> = {
        [K in keyof T]: Or<Or<Extends<"OR", K>, Extends<"AND", K>>, Extends<"NOT", K>> extends True
            ? // infer is only needed to not hit TS limit
              // based on the brilliant idea of Pierre-Antoine Mills
              // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
              T[K] extends infer TK
                ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
                : never
            : {} extends FieldPaths<T[K]>
              ? never
              : K;
    }[keyof T];

    /**
     * Convert tuple to union
     */
    type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
    type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
    type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

    /**
     * Like `Pick`, but additionally can also accept an array of keys
     */
    type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
        T,
        MaybeTupleToUnion<K>
    >;

    /**
     * Exclude all keys with underscores
     */
    type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

    export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

    type FieldRefInputType<Model, FieldType> = Model extends never
        ? never
        : FieldRef<Model, FieldType>;

    export const ModelName: {
        Decision: "Decision";
        Conflict: "Conflict";
        Event: "Event";
        View: "View";
    };

    export type ModelName = (typeof ModelName)[keyof typeof ModelName];

    export type Datasources = {
        db?: Datasource;
    };

    interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
        { extArgs: $Extensions.InternalArgs },
        $Utils.Record<string, any>
    > {
        returns: Prisma.TypeMap<
            this["params"]["extArgs"],
            ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
        >;
    }

    export type TypeMap<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > = {
        globalOmitOptions: {
            omit: GlobalOmitOptions;
        };
        meta: {
            modelProps: "decision" | "conflict" | "event" | "view";
            txIsolationLevel: Prisma.TransactionIsolationLevel;
        };
        model: {
            Decision: {
                payload: Prisma.$DecisionPayload<ExtArgs>;
                fields: Prisma.DecisionFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.DecisionFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.DecisionFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>;
                    };
                    findFirst: {
                        args: Prisma.DecisionFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.DecisionFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>;
                    };
                    findMany: {
                        args: Prisma.DecisionFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>[];
                    };
                    create: {
                        args: Prisma.DecisionCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>;
                    };
                    createMany: {
                        args: Prisma.DecisionCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.DecisionCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>[];
                    };
                    delete: {
                        args: Prisma.DecisionDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>;
                    };
                    update: {
                        args: Prisma.DecisionUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>;
                    };
                    deleteMany: {
                        args: Prisma.DecisionDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.DecisionUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.DecisionUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>[];
                    };
                    upsert: {
                        args: Prisma.DecisionUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$DecisionPayload>;
                    };
                    aggregate: {
                        args: Prisma.DecisionAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateDecision>;
                    };
                    groupBy: {
                        args: Prisma.DecisionGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<DecisionGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.DecisionCountArgs<ExtArgs>;
                        result: $Utils.Optional<DecisionCountAggregateOutputType> | number;
                    };
                };
            };
            Conflict: {
                payload: Prisma.$ConflictPayload<ExtArgs>;
                fields: Prisma.ConflictFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.ConflictFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.ConflictFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>;
                    };
                    findFirst: {
                        args: Prisma.ConflictFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.ConflictFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>;
                    };
                    findMany: {
                        args: Prisma.ConflictFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>[];
                    };
                    create: {
                        args: Prisma.ConflictCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>;
                    };
                    createMany: {
                        args: Prisma.ConflictCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.ConflictCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>[];
                    };
                    delete: {
                        args: Prisma.ConflictDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>;
                    };
                    update: {
                        args: Prisma.ConflictUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>;
                    };
                    deleteMany: {
                        args: Prisma.ConflictDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.ConflictUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.ConflictUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>[];
                    };
                    upsert: {
                        args: Prisma.ConflictUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ConflictPayload>;
                    };
                    aggregate: {
                        args: Prisma.ConflictAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateConflict>;
                    };
                    groupBy: {
                        args: Prisma.ConflictGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<ConflictGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.ConflictCountArgs<ExtArgs>;
                        result: $Utils.Optional<ConflictCountAggregateOutputType> | number;
                    };
                };
            };
            Event: {
                payload: Prisma.$EventPayload<ExtArgs>;
                fields: Prisma.EventFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.EventFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>;
                    };
                    findFirst: {
                        args: Prisma.EventFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>;
                    };
                    findMany: {
                        args: Prisma.EventFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>[];
                    };
                    create: {
                        args: Prisma.EventCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>;
                    };
                    createMany: {
                        args: Prisma.EventCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>[];
                    };
                    delete: {
                        args: Prisma.EventDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>;
                    };
                    update: {
                        args: Prisma.EventUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>;
                    };
                    deleteMany: {
                        args: Prisma.EventDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.EventUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>[];
                    };
                    upsert: {
                        args: Prisma.EventUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EventPayload>;
                    };
                    aggregate: {
                        args: Prisma.EventAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateEvent>;
                    };
                    groupBy: {
                        args: Prisma.EventGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<EventGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.EventCountArgs<ExtArgs>;
                        result: $Utils.Optional<EventCountAggregateOutputType> | number;
                    };
                };
            };
            View: {
                payload: Prisma.$ViewPayload<ExtArgs>;
                fields: Prisma.ViewFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.ViewFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.ViewFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>;
                    };
                    findFirst: {
                        args: Prisma.ViewFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.ViewFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>;
                    };
                    findMany: {
                        args: Prisma.ViewFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>[];
                    };
                    create: {
                        args: Prisma.ViewCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>;
                    };
                    createMany: {
                        args: Prisma.ViewCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.ViewCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>[];
                    };
                    delete: {
                        args: Prisma.ViewDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>;
                    };
                    update: {
                        args: Prisma.ViewUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>;
                    };
                    deleteMany: {
                        args: Prisma.ViewDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.ViewUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.ViewUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>[];
                    };
                    upsert: {
                        args: Prisma.ViewUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ViewPayload>;
                    };
                    aggregate: {
                        args: Prisma.ViewAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateView>;
                    };
                    groupBy: {
                        args: Prisma.ViewGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<ViewGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.ViewCountArgs<ExtArgs>;
                        result: $Utils.Optional<ViewCountAggregateOutputType> | number;
                    };
                };
            };
        };
    } & {
        other: {
            payload: any;
            operations: {
                $executeRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
                    result: any;
                };
                $executeRawUnsafe: {
                    args: [query: string, ...values: any[]];
                    result: any;
                };
                $queryRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
                    result: any;
                };
                $queryRawUnsafe: {
                    args: [query: string, ...values: any[]];
                    result: any;
                };
            };
        };
    };
    export const defineExtension: $Extensions.ExtendsHook<
        "define",
        Prisma.TypeMapCb,
        $Extensions.DefaultArgs
    >;
    export type DefaultPrismaClient = PrismaClient;
    export type ErrorFormat = "pretty" | "colorless" | "minimal";
    export interface PrismaClientOptions {
        /**
         * Overwrites the datasource url from your schema.prisma file
         */
        datasources?: Datasources;
        /**
         * Overwrites the datasource url from your schema.prisma file
         */
        datasourceUrl?: string;
        /**
         * @default "colorless"
         */
        errorFormat?: ErrorFormat;
        /**
         * @example
         * ```
         * // Shorthand for `emit: 'stdout'`
         * log: ['query', 'info', 'warn', 'error']
         *
         * // Emit as events only
         * log: [
         *   { emit: 'event', level: 'query' },
         *   { emit: 'event', level: 'info' },
         *   { emit: 'event', level: 'warn' }
         *   { emit: 'event', level: 'error' }
         * ]
         *
         * / Emit as events and log to stdout
         * og: [
         *  { emit: 'stdout', level: 'query' },
         *  { emit: 'stdout', level: 'info' },
         *  { emit: 'stdout', level: 'warn' }
         *  { emit: 'stdout', level: 'error' }
         *
         * ```
         * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
         */
        log?: (LogLevel | LogDefinition)[];
        /**
         * The default values for transactionOptions
         * maxWait ?= 2000
         * timeout ?= 5000
         */
        transactionOptions?: {
            maxWait?: number;
            timeout?: number;
            isolationLevel?: Prisma.TransactionIsolationLevel;
        };
        /**
         * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
         */
        adapter?: runtime.SqlDriverAdapterFactory | null;
        /**
         * Global configuration for omitting model fields by default.
         *
         * @example
         * ```
         * const prisma = new PrismaClient({
         *   omit: {
         *     user: {
         *       password: true
         *     }
         *   }
         * })
         * ```
         */
        omit?: Prisma.GlobalOmitConfig;
    }
    export type GlobalOmitConfig = {
        decision?: DecisionOmit;
        conflict?: ConflictOmit;
        event?: EventOmit;
        view?: ViewOmit;
    };

    /* Types for Logging */
    export type LogLevel = "info" | "query" | "warn" | "error";
    export type LogDefinition = {
        level: LogLevel;
        emit: "stdout" | "event";
    };

    export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

    export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T["level"] : T>;

    export type GetEvents<T extends any[]> =
        T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

    export type QueryEvent = {
        timestamp: Date;
        query: string;
        params: string;
        duration: number;
        target: string;
    };

    export type LogEvent = {
        timestamp: Date;
        message: string;
        target: string;
    };
    /* End Types for Logging */

    export type PrismaAction =
        | "findUnique"
        | "findUniqueOrThrow"
        | "findMany"
        | "findFirst"
        | "findFirstOrThrow"
        | "create"
        | "createMany"
        | "createManyAndReturn"
        | "update"
        | "updateMany"
        | "updateManyAndReturn"
        | "upsert"
        | "delete"
        | "deleteMany"
        | "executeRaw"
        | "queryRaw"
        | "aggregate"
        | "count"
        | "runCommandRaw"
        | "findRaw"
        | "groupBy";

    // tested in getLogLevel.test.ts
    export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

    /**
     * `PrismaClient` proxy available in interactive transactions.
     */
    export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

    export type Datasource = {
        url?: string;
    };

    /**
     * Count Types
     */

    /**
     * Count Type DecisionCountOutputType
     */

    export type DecisionCountOutputType = {
        conflictsAsA: number;
        conflictsAsB: number;
    };

    export type DecisionCountOutputTypeSelect<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        conflictsAsA?: boolean | DecisionCountOutputTypeCountConflictsAsAArgs;
        conflictsAsB?: boolean | DecisionCountOutputTypeCountConflictsAsBArgs;
    };

    // Custom InputTypes
    /**
     * DecisionCountOutputType without action
     */
    export type DecisionCountOutputTypeDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the DecisionCountOutputType
         */
        select?: DecisionCountOutputTypeSelect<ExtArgs> | null;
    };

    /**
     * DecisionCountOutputType without action
     */
    export type DecisionCountOutputTypeCountConflictsAsAArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: ConflictWhereInput;
    };

    /**
     * DecisionCountOutputType without action
     */
    export type DecisionCountOutputTypeCountConflictsAsBArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: ConflictWhereInput;
    };

    /**
     * Count Type ConflictCountOutputType
     */

    export type ConflictCountOutputType = {
        timeline: number;
        views: number;
    };

    export type ConflictCountOutputTypeSelect<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        timeline?: boolean | ConflictCountOutputTypeCountTimelineArgs;
        views?: boolean | ConflictCountOutputTypeCountViewsArgs;
    };

    // Custom InputTypes
    /**
     * ConflictCountOutputType without action
     */
    export type ConflictCountOutputTypeDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the ConflictCountOutputType
         */
        select?: ConflictCountOutputTypeSelect<ExtArgs> | null;
    };

    /**
     * ConflictCountOutputType without action
     */
    export type ConflictCountOutputTypeCountTimelineArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: EventWhereInput;
    };

    /**
     * ConflictCountOutputType without action
     */
    export type ConflictCountOutputTypeCountViewsArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: ViewWhereInput;
    };

    /**
     * Models
     */

    /**
     * Model Decision
     */

    export type AggregateDecision = {
        _count: DecisionCountAggregateOutputType | null;
        _min: DecisionMinAggregateOutputType | null;
        _max: DecisionMaxAggregateOutputType | null;
    };

    export type DecisionMinAggregateOutputType = {
        id: string | null;
        createdAt: Date | null;
        surface: $Enums.Surface | null;
        threadKey: string | null;
        threadName: string | null;
        decidedBy: string | null;
        rawText: string | null;
        subsystem: $Enums.Subsystem | null;
        condition: $Enums.Condition | null;
        action: $Enums.ClaimAction | null;
        supersededById: string | null;
    };

    export type DecisionMaxAggregateOutputType = {
        id: string | null;
        createdAt: Date | null;
        surface: $Enums.Surface | null;
        threadKey: string | null;
        threadName: string | null;
        decidedBy: string | null;
        rawText: string | null;
        subsystem: $Enums.Subsystem | null;
        condition: $Enums.Condition | null;
        action: $Enums.ClaimAction | null;
        supersededById: string | null;
    };

    export type DecisionCountAggregateOutputType = {
        id: number;
        createdAt: number;
        surface: number;
        threadKey: number;
        threadName: number;
        decidedBy: number;
        rawText: number;
        subsystem: number;
        condition: number;
        action: number;
        supersededById: number;
        _all: number;
    };

    export type DecisionMinAggregateInputType = {
        id?: true;
        createdAt?: true;
        surface?: true;
        threadKey?: true;
        threadName?: true;
        decidedBy?: true;
        rawText?: true;
        subsystem?: true;
        condition?: true;
        action?: true;
        supersededById?: true;
    };

    export type DecisionMaxAggregateInputType = {
        id?: true;
        createdAt?: true;
        surface?: true;
        threadKey?: true;
        threadName?: true;
        decidedBy?: true;
        rawText?: true;
        subsystem?: true;
        condition?: true;
        action?: true;
        supersededById?: true;
    };

    export type DecisionCountAggregateInputType = {
        id?: true;
        createdAt?: true;
        surface?: true;
        threadKey?: true;
        threadName?: true;
        decidedBy?: true;
        rawText?: true;
        subsystem?: true;
        condition?: true;
        action?: true;
        supersededById?: true;
        _all?: true;
    };

    export type DecisionAggregateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Decision to aggregate.
         */
        where?: DecisionWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Decisions to fetch.
         */
        orderBy?: DecisionOrderByWithRelationInput | DecisionOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: DecisionWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Decisions from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Decisions.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned Decisions
         **/
        _count?: true | DecisionCountAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: DecisionMinAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: DecisionMaxAggregateInputType;
    };

    export type GetDecisionAggregateType<T extends DecisionAggregateArgs> = {
        [P in keyof T & keyof AggregateDecision]: P extends "_count" | "count"
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateDecision[P]>
            : GetScalarType<T[P], AggregateDecision[P]>;
    };

    export type DecisionGroupByArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: DecisionWhereInput;
        orderBy?: DecisionOrderByWithAggregationInput | DecisionOrderByWithAggregationInput[];
        by: DecisionScalarFieldEnum[] | DecisionScalarFieldEnum;
        having?: DecisionScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: DecisionCountAggregateInputType | true;
        _min?: DecisionMinAggregateInputType;
        _max?: DecisionMaxAggregateInputType;
    };

    export type DecisionGroupByOutputType = {
        id: string;
        createdAt: Date;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById: string | null;
        _count: DecisionCountAggregateOutputType | null;
        _min: DecisionMinAggregateOutputType | null;
        _max: DecisionMaxAggregateOutputType | null;
    };

    type GetDecisionGroupByPayload<T extends DecisionGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<DecisionGroupByOutputType, T["by"]> & {
                [P in keyof T & keyof DecisionGroupByOutputType]: P extends "_count"
                    ? T[P] extends boolean
                        ? number
                        : GetScalarType<T[P], DecisionGroupByOutputType[P]>
                    : GetScalarType<T[P], DecisionGroupByOutputType[P]>;
            }
        >
    >;

    export type DecisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetSelect<
            {
                id?: boolean;
                createdAt?: boolean;
                surface?: boolean;
                threadKey?: boolean;
                threadName?: boolean;
                decidedBy?: boolean;
                rawText?: boolean;
                subsystem?: boolean;
                condition?: boolean;
                action?: boolean;
                supersededById?: boolean;
                conflictsAsA?: boolean | Decision$conflictsAsAArgs<ExtArgs>;
                conflictsAsB?: boolean | Decision$conflictsAsBArgs<ExtArgs>;
                _count?: boolean | DecisionCountOutputTypeDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["decision"]
        >;

    export type DecisionSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            createdAt?: boolean;
            surface?: boolean;
            threadKey?: boolean;
            threadName?: boolean;
            decidedBy?: boolean;
            rawText?: boolean;
            subsystem?: boolean;
            condition?: boolean;
            action?: boolean;
            supersededById?: boolean;
        },
        ExtArgs["result"]["decision"]
    >;

    export type DecisionSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            createdAt?: boolean;
            surface?: boolean;
            threadKey?: boolean;
            threadName?: boolean;
            decidedBy?: boolean;
            rawText?: boolean;
            subsystem?: boolean;
            condition?: boolean;
            action?: boolean;
            supersededById?: boolean;
        },
        ExtArgs["result"]["decision"]
    >;

    export type DecisionSelectScalar = {
        id?: boolean;
        createdAt?: boolean;
        surface?: boolean;
        threadKey?: boolean;
        threadName?: boolean;
        decidedBy?: boolean;
        rawText?: boolean;
        subsystem?: boolean;
        condition?: boolean;
        action?: boolean;
        supersededById?: boolean;
    };

    export type DecisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<
            | "id"
            | "createdAt"
            | "surface"
            | "threadKey"
            | "threadName"
            | "decidedBy"
            | "rawText"
            | "subsystem"
            | "condition"
            | "action"
            | "supersededById",
            ExtArgs["result"]["decision"]
        >;
    export type DecisionInclude<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        conflictsAsA?: boolean | Decision$conflictsAsAArgs<ExtArgs>;
        conflictsAsB?: boolean | Decision$conflictsAsBArgs<ExtArgs>;
        _count?: boolean | DecisionCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type DecisionIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {};
    export type DecisionIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {};

    export type $DecisionPayload<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        name: "Decision";
        objects: {
            conflictsAsA: Prisma.$ConflictPayload<ExtArgs>[];
            conflictsAsB: Prisma.$ConflictPayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<
            {
                id: string;
                createdAt: Date;
                surface: $Enums.Surface;
                threadKey: string;
                threadName: string;
                decidedBy: string;
                rawText: string;
                subsystem: $Enums.Subsystem;
                condition: $Enums.Condition;
                action: $Enums.ClaimAction;
                /**
                 * Superseded decisions are invisible to conflict detection.
                 */
                supersededById: string | null;
            },
            ExtArgs["result"]["decision"]
        >;
        composites: {};
    };

    type DecisionGetPayload<S extends boolean | null | undefined | DecisionDefaultArgs> =
        $Result.GetResult<Prisma.$DecisionPayload, S>;

    type DecisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        Omit<DecisionFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
            select?: DecisionCountAggregateInputType | true;
        };

    export interface DecisionDelegate<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>["model"]["Decision"];
            meta: { name: "Decision" };
        };
        /**
         * Find zero or one Decision that matches the filter.
         * @param {DecisionFindUniqueArgs} args - Arguments to find a Decision
         * @example
         * // Get one Decision
         * const decision = await prisma.decision.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends DecisionFindUniqueArgs>(
            args: SelectSubset<T, DecisionFindUniqueArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<
                Prisma.$DecisionPayload<ExtArgs>,
                T,
                "findUnique",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find one Decision that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {DecisionFindUniqueOrThrowArgs} args - Arguments to find a Decision
         * @example
         * // Get one Decision
         * const decision = await prisma.decision.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends DecisionFindUniqueOrThrowArgs>(
            args: SelectSubset<T, DecisionFindUniqueOrThrowArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<
                Prisma.$DecisionPayload<ExtArgs>,
                T,
                "findUniqueOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Decision that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionFindFirstArgs} args - Arguments to find a Decision
         * @example
         * // Get one Decision
         * const decision = await prisma.decision.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends DecisionFindFirstArgs>(
            args?: SelectSubset<T, DecisionFindFirstArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<
                Prisma.$DecisionPayload<ExtArgs>,
                T,
                "findFirst",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Decision that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionFindFirstOrThrowArgs} args - Arguments to find a Decision
         * @example
         * // Get one Decision
         * const decision = await prisma.decision.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends DecisionFindFirstOrThrowArgs>(
            args?: SelectSubset<T, DecisionFindFirstOrThrowArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<
                Prisma.$DecisionPayload<ExtArgs>,
                T,
                "findFirstOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find zero or more Decisions that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Decisions
         * const decisions = await prisma.decision.findMany()
         *
         * // Get first 10 Decisions
         * const decisions = await prisma.decision.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const decisionWithIdOnly = await prisma.decision.findMany({ select: { id: true } })
         *
         */
        findMany<T extends DecisionFindManyArgs>(
            args?: SelectSubset<T, DecisionFindManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<Prisma.$DecisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
        >;

        /**
         * Create a Decision.
         * @param {DecisionCreateArgs} args - Arguments to create a Decision.
         * @example
         * // Create one Decision
         * const Decision = await prisma.decision.create({
         *   data: {
         *     // ... data to create a Decision
         *   }
         * })
         *
         */
        create<T extends DecisionCreateArgs>(
            args: SelectSubset<T, DecisionCreateArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<Prisma.$DecisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Create many Decisions.
         * @param {DecisionCreateManyArgs} args - Arguments to create many Decisions.
         * @example
         * // Create many Decisions
         * const decision = await prisma.decision.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends DecisionCreateManyArgs>(
            args?: SelectSubset<T, DecisionCreateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Create many Decisions and returns the data saved in the database.
         * @param {DecisionCreateManyAndReturnArgs} args - Arguments to create many Decisions.
         * @example
         * // Create many Decisions
         * const decision = await prisma.decision.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Decisions and only return the `id`
         * const decisionWithIdOnly = await prisma.decision.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends DecisionCreateManyAndReturnArgs>(
            args?: SelectSubset<T, DecisionCreateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$DecisionPayload<ExtArgs>,
                T,
                "createManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Delete a Decision.
         * @param {DecisionDeleteArgs} args - Arguments to delete one Decision.
         * @example
         * // Delete one Decision
         * const Decision = await prisma.decision.delete({
         *   where: {
         *     // ... filter to delete one Decision
         *   }
         * })
         *
         */
        delete<T extends DecisionDeleteArgs>(
            args: SelectSubset<T, DecisionDeleteArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<Prisma.$DecisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Update one Decision.
         * @param {DecisionUpdateArgs} args - Arguments to update one Decision.
         * @example
         * // Update one Decision
         * const decision = await prisma.decision.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends DecisionUpdateArgs>(
            args: SelectSubset<T, DecisionUpdateArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<Prisma.$DecisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Delete zero or more Decisions.
         * @param {DecisionDeleteManyArgs} args - Arguments to filter Decisions to delete.
         * @example
         * // Delete a few Decisions
         * const { count } = await prisma.decision.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends DecisionDeleteManyArgs>(
            args?: SelectSubset<T, DecisionDeleteManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Decisions.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Decisions
         * const decision = await prisma.decision.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends DecisionUpdateManyArgs>(
            args: SelectSubset<T, DecisionUpdateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Decisions and returns the data updated in the database.
         * @param {DecisionUpdateManyAndReturnArgs} args - Arguments to update many Decisions.
         * @example
         * // Update many Decisions
         * const decision = await prisma.decision.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Decisions and only return the `id`
         * const decisionWithIdOnly = await prisma.decision.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends DecisionUpdateManyAndReturnArgs>(
            args: SelectSubset<T, DecisionUpdateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$DecisionPayload<ExtArgs>,
                T,
                "updateManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Create or update one Decision.
         * @param {DecisionUpsertArgs} args - Arguments to update or create a Decision.
         * @example
         * // Update or create a Decision
         * const decision = await prisma.decision.upsert({
         *   create: {
         *     // ... data to create a Decision
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the Decision we want to update
         *   }
         * })
         */
        upsert<T extends DecisionUpsertArgs>(
            args: SelectSubset<T, DecisionUpsertArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            $Result.GetResult<Prisma.$DecisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Count the number of Decisions.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionCountArgs} args - Arguments to filter Decisions to count.
         * @example
         * // Count the number of Decisions
         * const count = await prisma.decision.count({
         *   where: {
         *     // ... the filter for the Decisions we want to count
         *   }
         * })
         **/
        count<T extends DecisionCountArgs>(
            args?: Subset<T, DecisionCountArgs>,
        ): Prisma.PrismaPromise<
            T extends $Utils.Record<"select", any>
                ? T["select"] extends true
                    ? number
                    : GetScalarType<T["select"], DecisionCountAggregateOutputType>
                : number
        >;

        /**
         * Allows you to perform aggregations operations on a Decision.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends DecisionAggregateArgs>(
            args: Subset<T, DecisionAggregateArgs>,
        ): Prisma.PrismaPromise<GetDecisionAggregateType<T>>;

        /**
         * Group by Decision.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {DecisionGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends DecisionGroupByArgs,
            HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
            OrderByArg extends (True extends HasSelectOrTake
                ? { orderBy: DecisionGroupByArgs["orderBy"] }
                : { orderBy?: DecisionGroupByArgs["orderBy"] }),
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
            ByFields extends MaybeTupleToUnion<T["by"]>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T["having"]>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends (T["by"] extends never[] ? True : False),
            InputErrors extends (ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                  ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                              : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
                    }[HavingFields]
                  : "take" extends Keys<T>
                    ? "orderBy" extends Keys<T>
                        ? ByValid extends True
                            ? {}
                            : {
                                  [P in OrderFields]: P extends ByFields
                                      ? never
                                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                              }[OrderFields]
                        : 'Error: If you provide "take", you also need to provide "orderBy"'
                    : "skip" extends Keys<T>
                      ? "orderBy" extends Keys<T>
                          ? ByValid extends True
                              ? {}
                              : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                                }[OrderFields]
                          : 'Error: If you provide "skip", you also need to provide "orderBy"'
                      : ByValid extends True
                        ? {}
                        : {
                              [P in OrderFields]: P extends ByFields
                                  ? never
                                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                          }[OrderFields]),
        >(
            args: SubsetIntersection<T, DecisionGroupByArgs, OrderByArg> & InputErrors,
        ): {} extends InputErrors
            ? GetDecisionGroupByPayload<T>
            : Prisma.PrismaPromise<InputErrors>;
        /**
         * Fields of the Decision model
         */
        readonly fields: DecisionFieldRefs;
    }

    /**
     * The delegate class that acts as a "Promise-like" for Decision.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__DecisionClient<
        T,
        Null = never,
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        conflictsAsA<T extends Decision$conflictsAsAArgs<ExtArgs> = {}>(
            args?: Subset<T, Decision$conflictsAsAArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            | $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
            | Null
        >;
        conflictsAsB<T extends Decision$conflictsAsBArgs<ExtArgs> = {}>(
            args?: Subset<T, Decision$conflictsAsBArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            | $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
            | Null
        >;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(
            onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
        ): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the Decision model
     */
    interface DecisionFieldRefs {
        readonly id: FieldRef<"Decision", "String">;
        readonly createdAt: FieldRef<"Decision", "DateTime">;
        readonly surface: FieldRef<"Decision", "Surface">;
        readonly threadKey: FieldRef<"Decision", "String">;
        readonly threadName: FieldRef<"Decision", "String">;
        readonly decidedBy: FieldRef<"Decision", "String">;
        readonly rawText: FieldRef<"Decision", "String">;
        readonly subsystem: FieldRef<"Decision", "Subsystem">;
        readonly condition: FieldRef<"Decision", "Condition">;
        readonly action: FieldRef<"Decision", "ClaimAction">;
        readonly supersededById: FieldRef<"Decision", "String">;
    }

    // Custom InputTypes
    /**
     * Decision findUnique
     */
    export type DecisionFindUniqueArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * Filter, which Decision to fetch.
         */
        where: DecisionWhereUniqueInput;
    };

    /**
     * Decision findUniqueOrThrow
     */
    export type DecisionFindUniqueOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * Filter, which Decision to fetch.
         */
        where: DecisionWhereUniqueInput;
    };

    /**
     * Decision findFirst
     */
    export type DecisionFindFirstArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * Filter, which Decision to fetch.
         */
        where?: DecisionWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Decisions to fetch.
         */
        orderBy?: DecisionOrderByWithRelationInput | DecisionOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Decisions.
         */
        cursor?: DecisionWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Decisions from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Decisions.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Decisions.
         */
        distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[];
    };

    /**
     * Decision findFirstOrThrow
     */
    export type DecisionFindFirstOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * Filter, which Decision to fetch.
         */
        where?: DecisionWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Decisions to fetch.
         */
        orderBy?: DecisionOrderByWithRelationInput | DecisionOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Decisions.
         */
        cursor?: DecisionWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Decisions from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Decisions.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Decisions.
         */
        distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[];
    };

    /**
     * Decision findMany
     */
    export type DecisionFindManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * Filter, which Decisions to fetch.
         */
        where?: DecisionWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Decisions to fetch.
         */
        orderBy?: DecisionOrderByWithRelationInput | DecisionOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing Decisions.
         */
        cursor?: DecisionWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Decisions from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Decisions.
         */
        skip?: number;
        distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[];
    };

    /**
     * Decision create
     */
    export type DecisionCreateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * The data needed to create a Decision.
         */
        data: XOR<DecisionCreateInput, DecisionUncheckedCreateInput>;
    };

    /**
     * Decision createMany
     */
    export type DecisionCreateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to create many Decisions.
         */
        data: DecisionCreateManyInput | DecisionCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * Decision createManyAndReturn
     */
    export type DecisionCreateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelectCreateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * The data used to create many Decisions.
         */
        data: DecisionCreateManyInput | DecisionCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * Decision update
     */
    export type DecisionUpdateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * The data needed to update a Decision.
         */
        data: XOR<DecisionUpdateInput, DecisionUncheckedUpdateInput>;
        /**
         * Choose, which Decision to update.
         */
        where: DecisionWhereUniqueInput;
    };

    /**
     * Decision updateMany
     */
    export type DecisionUpdateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to update Decisions.
         */
        data: XOR<DecisionUpdateManyMutationInput, DecisionUncheckedUpdateManyInput>;
        /**
         * Filter which Decisions to update
         */
        where?: DecisionWhereInput;
        /**
         * Limit how many Decisions to update.
         */
        limit?: number;
    };

    /**
     * Decision updateManyAndReturn
     */
    export type DecisionUpdateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelectUpdateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * The data used to update Decisions.
         */
        data: XOR<DecisionUpdateManyMutationInput, DecisionUncheckedUpdateManyInput>;
        /**
         * Filter which Decisions to update
         */
        where?: DecisionWhereInput;
        /**
         * Limit how many Decisions to update.
         */
        limit?: number;
    };

    /**
     * Decision upsert
     */
    export type DecisionUpsertArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * The filter to search for the Decision to update in case it exists.
         */
        where: DecisionWhereUniqueInput;
        /**
         * In case the Decision found by the `where` argument doesn't exist, create a new Decision with this data.
         */
        create: XOR<DecisionCreateInput, DecisionUncheckedCreateInput>;
        /**
         * In case the Decision was found with the provided `where` argument, update it with this data.
         */
        update: XOR<DecisionUpdateInput, DecisionUncheckedUpdateInput>;
    };

    /**
     * Decision delete
     */
    export type DecisionDeleteArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
        /**
         * Filter which Decision to delete.
         */
        where: DecisionWhereUniqueInput;
    };

    /**
     * Decision deleteMany
     */
    export type DecisionDeleteManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Decisions to delete
         */
        where?: DecisionWhereInput;
        /**
         * Limit how many Decisions to delete.
         */
        limit?: number;
    };

    /**
     * Decision.conflictsAsA
     */
    export type Decision$conflictsAsAArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        where?: ConflictWhereInput;
        orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[];
        cursor?: ConflictWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[];
    };

    /**
     * Decision.conflictsAsB
     */
    export type Decision$conflictsAsBArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        where?: ConflictWhereInput;
        orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[];
        cursor?: ConflictWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[];
    };

    /**
     * Decision without action
     */
    export type DecisionDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Decision
         */
        select?: DecisionSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Decision
         */
        omit?: DecisionOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: DecisionInclude<ExtArgs> | null;
    };

    /**
     * Model Conflict
     */

    export type AggregateConflict = {
        _count: ConflictCountAggregateOutputType | null;
        _avg: ConflictAvgAggregateOutputType | null;
        _sum: ConflictSumAggregateOutputType | null;
        _min: ConflictMinAggregateOutputType | null;
        _max: ConflictMaxAggregateOutputType | null;
    };

    export type ConflictAvgAggregateOutputType = {
        version: number | null;
    };

    export type ConflictSumAggregateOutputType = {
        version: number | null;
    };

    export type ConflictMinAggregateOutputType = {
        id: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        decisionAId: string | null;
        decisionBId: string | null;
        status: $Enums.ConflictStatus | null;
        acknowledgedBy: string | null;
        resolution: string | null;
    };

    export type ConflictMaxAggregateOutputType = {
        id: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        decisionAId: string | null;
        decisionBId: string | null;
        status: $Enums.ConflictStatus | null;
        acknowledgedBy: string | null;
        resolution: string | null;
    };

    export type ConflictCountAggregateOutputType = {
        id: number;
        createdAt: number;
        updatedAt: number;
        version: number;
        decisionAId: number;
        decisionBId: number;
        status: number;
        acknowledgedBy: number;
        resolution: number;
        framings: number;
        _all: number;
    };

    export type ConflictAvgAggregateInputType = {
        version?: true;
    };

    export type ConflictSumAggregateInputType = {
        version?: true;
    };

    export type ConflictMinAggregateInputType = {
        id?: true;
        createdAt?: true;
        updatedAt?: true;
        version?: true;
        decisionAId?: true;
        decisionBId?: true;
        status?: true;
        acknowledgedBy?: true;
        resolution?: true;
    };

    export type ConflictMaxAggregateInputType = {
        id?: true;
        createdAt?: true;
        updatedAt?: true;
        version?: true;
        decisionAId?: true;
        decisionBId?: true;
        status?: true;
        acknowledgedBy?: true;
        resolution?: true;
    };

    export type ConflictCountAggregateInputType = {
        id?: true;
        createdAt?: true;
        updatedAt?: true;
        version?: true;
        decisionAId?: true;
        decisionBId?: true;
        status?: true;
        acknowledgedBy?: true;
        resolution?: true;
        framings?: true;
        _all?: true;
    };

    export type ConflictAggregateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Conflict to aggregate.
         */
        where?: ConflictWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Conflicts to fetch.
         */
        orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: ConflictWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Conflicts from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Conflicts.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned Conflicts
         **/
        _count?: true | ConflictCountAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to average
         **/
        _avg?: ConflictAvgAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to sum
         **/
        _sum?: ConflictSumAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: ConflictMinAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: ConflictMaxAggregateInputType;
    };

    export type GetConflictAggregateType<T extends ConflictAggregateArgs> = {
        [P in keyof T & keyof AggregateConflict]: P extends "_count" | "count"
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateConflict[P]>
            : GetScalarType<T[P], AggregateConflict[P]>;
    };

    export type ConflictGroupByArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: ConflictWhereInput;
        orderBy?: ConflictOrderByWithAggregationInput | ConflictOrderByWithAggregationInput[];
        by: ConflictScalarFieldEnum[] | ConflictScalarFieldEnum;
        having?: ConflictScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: ConflictCountAggregateInputType | true;
        _avg?: ConflictAvgAggregateInputType;
        _sum?: ConflictSumAggregateInputType;
        _min?: ConflictMinAggregateInputType;
        _max?: ConflictMaxAggregateInputType;
    };

    export type ConflictGroupByOutputType = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        decisionAId: string;
        decisionBId: string;
        status: $Enums.ConflictStatus;
        acknowledgedBy: string | null;
        resolution: string | null;
        framings: JsonValue;
        _count: ConflictCountAggregateOutputType | null;
        _avg: ConflictAvgAggregateOutputType | null;
        _sum: ConflictSumAggregateOutputType | null;
        _min: ConflictMinAggregateOutputType | null;
        _max: ConflictMaxAggregateOutputType | null;
    };

    type GetConflictGroupByPayload<T extends ConflictGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<ConflictGroupByOutputType, T["by"]> & {
                [P in keyof T & keyof ConflictGroupByOutputType]: P extends "_count"
                    ? T[P] extends boolean
                        ? number
                        : GetScalarType<T[P], ConflictGroupByOutputType[P]>
                    : GetScalarType<T[P], ConflictGroupByOutputType[P]>;
            }
        >
    >;

    export type ConflictSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetSelect<
            {
                id?: boolean;
                createdAt?: boolean;
                updatedAt?: boolean;
                version?: boolean;
                decisionAId?: boolean;
                decisionBId?: boolean;
                status?: boolean;
                acknowledgedBy?: boolean;
                resolution?: boolean;
                framings?: boolean;
                decisionA?: boolean | DecisionDefaultArgs<ExtArgs>;
                decisionB?: boolean | DecisionDefaultArgs<ExtArgs>;
                timeline?: boolean | Conflict$timelineArgs<ExtArgs>;
                views?: boolean | Conflict$viewsArgs<ExtArgs>;
                _count?: boolean | ConflictCountOutputTypeDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["conflict"]
        >;

    export type ConflictSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            createdAt?: boolean;
            updatedAt?: boolean;
            version?: boolean;
            decisionAId?: boolean;
            decisionBId?: boolean;
            status?: boolean;
            acknowledgedBy?: boolean;
            resolution?: boolean;
            framings?: boolean;
            decisionA?: boolean | DecisionDefaultArgs<ExtArgs>;
            decisionB?: boolean | DecisionDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["conflict"]
    >;

    export type ConflictSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            createdAt?: boolean;
            updatedAt?: boolean;
            version?: boolean;
            decisionAId?: boolean;
            decisionBId?: boolean;
            status?: boolean;
            acknowledgedBy?: boolean;
            resolution?: boolean;
            framings?: boolean;
            decisionA?: boolean | DecisionDefaultArgs<ExtArgs>;
            decisionB?: boolean | DecisionDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["conflict"]
    >;

    export type ConflictSelectScalar = {
        id?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        version?: boolean;
        decisionAId?: boolean;
        decisionBId?: boolean;
        status?: boolean;
        acknowledgedBy?: boolean;
        resolution?: boolean;
        framings?: boolean;
    };

    export type ConflictOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<
            | "id"
            | "createdAt"
            | "updatedAt"
            | "version"
            | "decisionAId"
            | "decisionBId"
            | "status"
            | "acknowledgedBy"
            | "resolution"
            | "framings",
            ExtArgs["result"]["conflict"]
        >;
    export type ConflictInclude<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        decisionA?: boolean | DecisionDefaultArgs<ExtArgs>;
        decisionB?: boolean | DecisionDefaultArgs<ExtArgs>;
        timeline?: boolean | Conflict$timelineArgs<ExtArgs>;
        views?: boolean | Conflict$viewsArgs<ExtArgs>;
        _count?: boolean | ConflictCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type ConflictIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        decisionA?: boolean | DecisionDefaultArgs<ExtArgs>;
        decisionB?: boolean | DecisionDefaultArgs<ExtArgs>;
    };
    export type ConflictIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        decisionA?: boolean | DecisionDefaultArgs<ExtArgs>;
        decisionB?: boolean | DecisionDefaultArgs<ExtArgs>;
    };

    export type $ConflictPayload<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        name: "Conflict";
        objects: {
            decisionA: Prisma.$DecisionPayload<ExtArgs>;
            decisionB: Prisma.$DecisionPayload<ExtArgs>;
            timeline: Prisma.$EventPayload<ExtArgs>[];
            views: Prisma.$ViewPayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<
            {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                version: number;
                decisionAId: string;
                decisionBId: string;
                status: $Enums.ConflictStatus;
                acknowledgedBy: string | null;
                resolution: string | null;
                /**
                 * The agent's wording of the same conflict, keyed by audience.
                 */
                framings: Prisma.JsonValue;
            },
            ExtArgs["result"]["conflict"]
        >;
        composites: {};
    };

    type ConflictGetPayload<S extends boolean | null | undefined | ConflictDefaultArgs> =
        $Result.GetResult<Prisma.$ConflictPayload, S>;

    type ConflictCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        Omit<ConflictFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
            select?: ConflictCountAggregateInputType | true;
        };

    export interface ConflictDelegate<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>["model"]["Conflict"];
            meta: { name: "Conflict" };
        };
        /**
         * Find zero or one Conflict that matches the filter.
         * @param {ConflictFindUniqueArgs} args - Arguments to find a Conflict
         * @example
         * // Get one Conflict
         * const conflict = await prisma.conflict.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends ConflictFindUniqueArgs>(
            args: SelectSubset<T, ConflictFindUniqueArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<
                Prisma.$ConflictPayload<ExtArgs>,
                T,
                "findUnique",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find one Conflict that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {ConflictFindUniqueOrThrowArgs} args - Arguments to find a Conflict
         * @example
         * // Get one Conflict
         * const conflict = await prisma.conflict.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends ConflictFindUniqueOrThrowArgs>(
            args: SelectSubset<T, ConflictFindUniqueOrThrowArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<
                Prisma.$ConflictPayload<ExtArgs>,
                T,
                "findUniqueOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Conflict that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictFindFirstArgs} args - Arguments to find a Conflict
         * @example
         * // Get one Conflict
         * const conflict = await prisma.conflict.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends ConflictFindFirstArgs>(
            args?: SelectSubset<T, ConflictFindFirstArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<
                Prisma.$ConflictPayload<ExtArgs>,
                T,
                "findFirst",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Conflict that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictFindFirstOrThrowArgs} args - Arguments to find a Conflict
         * @example
         * // Get one Conflict
         * const conflict = await prisma.conflict.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends ConflictFindFirstOrThrowArgs>(
            args?: SelectSubset<T, ConflictFindFirstOrThrowArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<
                Prisma.$ConflictPayload<ExtArgs>,
                T,
                "findFirstOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find zero or more Conflicts that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Conflicts
         * const conflicts = await prisma.conflict.findMany()
         *
         * // Get first 10 Conflicts
         * const conflicts = await prisma.conflict.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const conflictWithIdOnly = await prisma.conflict.findMany({ select: { id: true } })
         *
         */
        findMany<T extends ConflictFindManyArgs>(
            args?: SelectSubset<T, ConflictFindManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
        >;

        /**
         * Create a Conflict.
         * @param {ConflictCreateArgs} args - Arguments to create a Conflict.
         * @example
         * // Create one Conflict
         * const Conflict = await prisma.conflict.create({
         *   data: {
         *     // ... data to create a Conflict
         *   }
         * })
         *
         */
        create<T extends ConflictCreateArgs>(
            args: SelectSubset<T, ConflictCreateArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Create many Conflicts.
         * @param {ConflictCreateManyArgs} args - Arguments to create many Conflicts.
         * @example
         * // Create many Conflicts
         * const conflict = await prisma.conflict.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends ConflictCreateManyArgs>(
            args?: SelectSubset<T, ConflictCreateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Create many Conflicts and returns the data saved in the database.
         * @param {ConflictCreateManyAndReturnArgs} args - Arguments to create many Conflicts.
         * @example
         * // Create many Conflicts
         * const conflict = await prisma.conflict.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Conflicts and only return the `id`
         * const conflictWithIdOnly = await prisma.conflict.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends ConflictCreateManyAndReturnArgs>(
            args?: SelectSubset<T, ConflictCreateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$ConflictPayload<ExtArgs>,
                T,
                "createManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Delete a Conflict.
         * @param {ConflictDeleteArgs} args - Arguments to delete one Conflict.
         * @example
         * // Delete one Conflict
         * const Conflict = await prisma.conflict.delete({
         *   where: {
         *     // ... filter to delete one Conflict
         *   }
         * })
         *
         */
        delete<T extends ConflictDeleteArgs>(
            args: SelectSubset<T, ConflictDeleteArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Update one Conflict.
         * @param {ConflictUpdateArgs} args - Arguments to update one Conflict.
         * @example
         * // Update one Conflict
         * const conflict = await prisma.conflict.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends ConflictUpdateArgs>(
            args: SelectSubset<T, ConflictUpdateArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Delete zero or more Conflicts.
         * @param {ConflictDeleteManyArgs} args - Arguments to filter Conflicts to delete.
         * @example
         * // Delete a few Conflicts
         * const { count } = await prisma.conflict.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends ConflictDeleteManyArgs>(
            args?: SelectSubset<T, ConflictDeleteManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Conflicts.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Conflicts
         * const conflict = await prisma.conflict.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends ConflictUpdateManyArgs>(
            args: SelectSubset<T, ConflictUpdateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Conflicts and returns the data updated in the database.
         * @param {ConflictUpdateManyAndReturnArgs} args - Arguments to update many Conflicts.
         * @example
         * // Update many Conflicts
         * const conflict = await prisma.conflict.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Conflicts and only return the `id`
         * const conflictWithIdOnly = await prisma.conflict.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends ConflictUpdateManyAndReturnArgs>(
            args: SelectSubset<T, ConflictUpdateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$ConflictPayload<ExtArgs>,
                T,
                "updateManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Create or update one Conflict.
         * @param {ConflictUpsertArgs} args - Arguments to update or create a Conflict.
         * @example
         * // Update or create a Conflict
         * const conflict = await prisma.conflict.upsert({
         *   create: {
         *     // ... data to create a Conflict
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the Conflict we want to update
         *   }
         * })
         */
        upsert<T extends ConflictUpsertArgs>(
            args: SelectSubset<T, ConflictUpsertArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            $Result.GetResult<Prisma.$ConflictPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Count the number of Conflicts.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictCountArgs} args - Arguments to filter Conflicts to count.
         * @example
         * // Count the number of Conflicts
         * const count = await prisma.conflict.count({
         *   where: {
         *     // ... the filter for the Conflicts we want to count
         *   }
         * })
         **/
        count<T extends ConflictCountArgs>(
            args?: Subset<T, ConflictCountArgs>,
        ): Prisma.PrismaPromise<
            T extends $Utils.Record<"select", any>
                ? T["select"] extends true
                    ? number
                    : GetScalarType<T["select"], ConflictCountAggregateOutputType>
                : number
        >;

        /**
         * Allows you to perform aggregations operations on a Conflict.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends ConflictAggregateArgs>(
            args: Subset<T, ConflictAggregateArgs>,
        ): Prisma.PrismaPromise<GetConflictAggregateType<T>>;

        /**
         * Group by Conflict.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConflictGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends ConflictGroupByArgs,
            HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
            OrderByArg extends (True extends HasSelectOrTake
                ? { orderBy: ConflictGroupByArgs["orderBy"] }
                : { orderBy?: ConflictGroupByArgs["orderBy"] }),
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
            ByFields extends MaybeTupleToUnion<T["by"]>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T["having"]>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends (T["by"] extends never[] ? True : False),
            InputErrors extends (ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                  ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                              : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
                    }[HavingFields]
                  : "take" extends Keys<T>
                    ? "orderBy" extends Keys<T>
                        ? ByValid extends True
                            ? {}
                            : {
                                  [P in OrderFields]: P extends ByFields
                                      ? never
                                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                              }[OrderFields]
                        : 'Error: If you provide "take", you also need to provide "orderBy"'
                    : "skip" extends Keys<T>
                      ? "orderBy" extends Keys<T>
                          ? ByValid extends True
                              ? {}
                              : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                                }[OrderFields]
                          : 'Error: If you provide "skip", you also need to provide "orderBy"'
                      : ByValid extends True
                        ? {}
                        : {
                              [P in OrderFields]: P extends ByFields
                                  ? never
                                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                          }[OrderFields]),
        >(
            args: SubsetIntersection<T, ConflictGroupByArgs, OrderByArg> & InputErrors,
        ): {} extends InputErrors
            ? GetConflictGroupByPayload<T>
            : Prisma.PrismaPromise<InputErrors>;
        /**
         * Fields of the Conflict model
         */
        readonly fields: ConflictFieldRefs;
    }

    /**
     * The delegate class that acts as a "Promise-like" for Conflict.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__ConflictClient<
        T,
        Null = never,
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        decisionA<T extends DecisionDefaultArgs<ExtArgs> = {}>(
            args?: Subset<T, DecisionDefaultArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            | $Result.GetResult<
                  Prisma.$DecisionPayload<ExtArgs>,
                  T,
                  "findUniqueOrThrow",
                  GlobalOmitOptions
              >
            | Null,
            Null,
            ExtArgs,
            GlobalOmitOptions
        >;
        decisionB<T extends DecisionDefaultArgs<ExtArgs> = {}>(
            args?: Subset<T, DecisionDefaultArgs<ExtArgs>>,
        ): Prisma__DecisionClient<
            | $Result.GetResult<
                  Prisma.$DecisionPayload<ExtArgs>,
                  T,
                  "findUniqueOrThrow",
                  GlobalOmitOptions
              >
            | Null,
            Null,
            ExtArgs,
            GlobalOmitOptions
        >;
        timeline<T extends Conflict$timelineArgs<ExtArgs> = {}>(
            args?: Subset<T, Conflict$timelineArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            | $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
            | Null
        >;
        views<T extends Conflict$viewsArgs<ExtArgs> = {}>(
            args?: Subset<T, Conflict$viewsArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null
        >;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(
            onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
        ): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the Conflict model
     */
    interface ConflictFieldRefs {
        readonly id: FieldRef<"Conflict", "String">;
        readonly createdAt: FieldRef<"Conflict", "DateTime">;
        readonly updatedAt: FieldRef<"Conflict", "DateTime">;
        readonly version: FieldRef<"Conflict", "Int">;
        readonly decisionAId: FieldRef<"Conflict", "String">;
        readonly decisionBId: FieldRef<"Conflict", "String">;
        readonly status: FieldRef<"Conflict", "ConflictStatus">;
        readonly acknowledgedBy: FieldRef<"Conflict", "String">;
        readonly resolution: FieldRef<"Conflict", "String">;
        readonly framings: FieldRef<"Conflict", "Json">;
    }

    // Custom InputTypes
    /**
     * Conflict findUnique
     */
    export type ConflictFindUniqueArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * Filter, which Conflict to fetch.
         */
        where: ConflictWhereUniqueInput;
    };

    /**
     * Conflict findUniqueOrThrow
     */
    export type ConflictFindUniqueOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * Filter, which Conflict to fetch.
         */
        where: ConflictWhereUniqueInput;
    };

    /**
     * Conflict findFirst
     */
    export type ConflictFindFirstArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * Filter, which Conflict to fetch.
         */
        where?: ConflictWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Conflicts to fetch.
         */
        orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Conflicts.
         */
        cursor?: ConflictWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Conflicts from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Conflicts.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Conflicts.
         */
        distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[];
    };

    /**
     * Conflict findFirstOrThrow
     */
    export type ConflictFindFirstOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * Filter, which Conflict to fetch.
         */
        where?: ConflictWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Conflicts to fetch.
         */
        orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Conflicts.
         */
        cursor?: ConflictWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Conflicts from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Conflicts.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Conflicts.
         */
        distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[];
    };

    /**
     * Conflict findMany
     */
    export type ConflictFindManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * Filter, which Conflicts to fetch.
         */
        where?: ConflictWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Conflicts to fetch.
         */
        orderBy?: ConflictOrderByWithRelationInput | ConflictOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing Conflicts.
         */
        cursor?: ConflictWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Conflicts from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Conflicts.
         */
        skip?: number;
        distinct?: ConflictScalarFieldEnum | ConflictScalarFieldEnum[];
    };

    /**
     * Conflict create
     */
    export type ConflictCreateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * The data needed to create a Conflict.
         */
        data: XOR<ConflictCreateInput, ConflictUncheckedCreateInput>;
    };

    /**
     * Conflict createMany
     */
    export type ConflictCreateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to create many Conflicts.
         */
        data: ConflictCreateManyInput | ConflictCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * Conflict createManyAndReturn
     */
    export type ConflictCreateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelectCreateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * The data used to create many Conflicts.
         */
        data: ConflictCreateManyInput | ConflictCreateManyInput[];
        skipDuplicates?: boolean;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictIncludeCreateManyAndReturn<ExtArgs> | null;
    };

    /**
     * Conflict update
     */
    export type ConflictUpdateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * The data needed to update a Conflict.
         */
        data: XOR<ConflictUpdateInput, ConflictUncheckedUpdateInput>;
        /**
         * Choose, which Conflict to update.
         */
        where: ConflictWhereUniqueInput;
    };

    /**
     * Conflict updateMany
     */
    export type ConflictUpdateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to update Conflicts.
         */
        data: XOR<ConflictUpdateManyMutationInput, ConflictUncheckedUpdateManyInput>;
        /**
         * Filter which Conflicts to update
         */
        where?: ConflictWhereInput;
        /**
         * Limit how many Conflicts to update.
         */
        limit?: number;
    };

    /**
     * Conflict updateManyAndReturn
     */
    export type ConflictUpdateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelectUpdateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * The data used to update Conflicts.
         */
        data: XOR<ConflictUpdateManyMutationInput, ConflictUncheckedUpdateManyInput>;
        /**
         * Filter which Conflicts to update
         */
        where?: ConflictWhereInput;
        /**
         * Limit how many Conflicts to update.
         */
        limit?: number;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictIncludeUpdateManyAndReturn<ExtArgs> | null;
    };

    /**
     * Conflict upsert
     */
    export type ConflictUpsertArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * The filter to search for the Conflict to update in case it exists.
         */
        where: ConflictWhereUniqueInput;
        /**
         * In case the Conflict found by the `where` argument doesn't exist, create a new Conflict with this data.
         */
        create: XOR<ConflictCreateInput, ConflictUncheckedCreateInput>;
        /**
         * In case the Conflict was found with the provided `where` argument, update it with this data.
         */
        update: XOR<ConflictUpdateInput, ConflictUncheckedUpdateInput>;
    };

    /**
     * Conflict delete
     */
    export type ConflictDeleteArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
        /**
         * Filter which Conflict to delete.
         */
        where: ConflictWhereUniqueInput;
    };

    /**
     * Conflict deleteMany
     */
    export type ConflictDeleteManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Conflicts to delete
         */
        where?: ConflictWhereInput;
        /**
         * Limit how many Conflicts to delete.
         */
        limit?: number;
    };

    /**
     * Conflict.timeline
     */
    export type Conflict$timelineArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        where?: EventWhereInput;
        orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[];
        cursor?: EventWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: EventScalarFieldEnum | EventScalarFieldEnum[];
    };

    /**
     * Conflict.views
     */
    export type Conflict$viewsArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
        where?: ViewWhereInput;
        orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[];
        cursor?: ViewWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[];
    };

    /**
     * Conflict without action
     */
    export type ConflictDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Conflict
         */
        select?: ConflictSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Conflict
         */
        omit?: ConflictOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ConflictInclude<ExtArgs> | null;
    };

    /**
     * Model Event
     */

    export type AggregateEvent = {
        _count: EventCountAggregateOutputType | null;
        _min: EventMinAggregateOutputType | null;
        _max: EventMaxAggregateOutputType | null;
    };

    export type EventMinAggregateOutputType = {
        id: string | null;
        conflictId: string | null;
        at: Date | null;
        by: string | null;
        what: string | null;
    };

    export type EventMaxAggregateOutputType = {
        id: string | null;
        conflictId: string | null;
        at: Date | null;
        by: string | null;
        what: string | null;
    };

    export type EventCountAggregateOutputType = {
        id: number;
        conflictId: number;
        at: number;
        by: number;
        what: number;
        _all: number;
    };

    export type EventMinAggregateInputType = {
        id?: true;
        conflictId?: true;
        at?: true;
        by?: true;
        what?: true;
    };

    export type EventMaxAggregateInputType = {
        id?: true;
        conflictId?: true;
        at?: true;
        by?: true;
        what?: true;
    };

    export type EventCountAggregateInputType = {
        id?: true;
        conflictId?: true;
        at?: true;
        by?: true;
        what?: true;
        _all?: true;
    };

    export type EventAggregateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Event to aggregate.
         */
        where?: EventWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Events to fetch.
         */
        orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: EventWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Events from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Events.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned Events
         **/
        _count?: true | EventCountAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: EventMinAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: EventMaxAggregateInputType;
    };

    export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends "_count" | "count"
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateEvent[P]>
            : GetScalarType<T[P], AggregateEvent[P]>;
    };

    export type EventGroupByArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: EventWhereInput;
        orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[];
        by: EventScalarFieldEnum[] | EventScalarFieldEnum;
        having?: EventScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: EventCountAggregateInputType | true;
        _min?: EventMinAggregateInputType;
        _max?: EventMaxAggregateInputType;
    };

    export type EventGroupByOutputType = {
        id: string;
        conflictId: string;
        at: Date;
        by: string;
        what: string;
        _count: EventCountAggregateOutputType | null;
        _min: EventMinAggregateOutputType | null;
        _max: EventMaxAggregateOutputType | null;
    };

    type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<EventGroupByOutputType, T["by"]> & {
                [P in keyof T & keyof EventGroupByOutputType]: P extends "_count"
                    ? T[P] extends boolean
                        ? number
                        : GetScalarType<T[P], EventGroupByOutputType[P]>
                    : GetScalarType<T[P], EventGroupByOutputType[P]>;
            }
        >
    >;

    export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetSelect<
            {
                id?: boolean;
                conflictId?: boolean;
                at?: boolean;
                by?: boolean;
                what?: boolean;
                conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["event"]
        >;

    export type EventSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            conflictId?: boolean;
            at?: boolean;
            by?: boolean;
            what?: boolean;
            conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["event"]
    >;

    export type EventSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            conflictId?: boolean;
            at?: boolean;
            by?: boolean;
            what?: boolean;
            conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["event"]
    >;

    export type EventSelectScalar = {
        id?: boolean;
        conflictId?: boolean;
        at?: boolean;
        by?: boolean;
        what?: boolean;
    };

    export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<"id" | "conflictId" | "at" | "by" | "what", ExtArgs["result"]["event"]>;
    export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
    };
    export type EventIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
    };
    export type EventIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
    };

    export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            name: "Event";
            objects: {
                conflict: Prisma.$ConflictPayload<ExtArgs>;
            };
            scalars: $Extensions.GetPayloadResult<
                {
                    id: string;
                    conflictId: string;
                    at: Date;
                    by: string;
                    what: string;
                },
                ExtArgs["result"]["event"]
            >;
            composites: {};
        };

    type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> =
        $Result.GetResult<Prisma.$EventPayload, S>;

    type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
        EventFindManyArgs,
        "select" | "include" | "distinct" | "omit"
    > & {
        select?: EventCountAggregateInputType | true;
    };

    export interface EventDelegate<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > {
        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Event"]; meta: { name: "Event" } };
        /**
         * Find zero or one Event that matches the filter.
         * @param {EventFindUniqueArgs} args - Arguments to find a Event
         * @example
         * // Get one Event
         * const event = await prisma.event.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends EventFindUniqueArgs>(
            args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<
                Prisma.$EventPayload<ExtArgs>,
                T,
                "findUnique",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find one Event that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
         * @example
         * // Get one Event
         * const event = await prisma.event.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(
            args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<
                Prisma.$EventPayload<ExtArgs>,
                T,
                "findUniqueOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Event that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventFindFirstArgs} args - Arguments to find a Event
         * @example
         * // Get one Event
         * const event = await prisma.event.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends EventFindFirstArgs>(
            args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<
                Prisma.$EventPayload<ExtArgs>,
                T,
                "findFirst",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Event that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
         * @example
         * // Get one Event
         * const event = await prisma.event.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(
            args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<
                Prisma.$EventPayload<ExtArgs>,
                T,
                "findFirstOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find zero or more Events that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Events
         * const events = await prisma.event.findMany()
         *
         * // Get first 10 Events
         * const events = await prisma.event.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
         *
         */
        findMany<T extends EventFindManyArgs>(
            args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
        >;

        /**
         * Create a Event.
         * @param {EventCreateArgs} args - Arguments to create a Event.
         * @example
         * // Create one Event
         * const Event = await prisma.event.create({
         *   data: {
         *     // ... data to create a Event
         *   }
         * })
         *
         */
        create<T extends EventCreateArgs>(
            args: SelectSubset<T, EventCreateArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Create many Events.
         * @param {EventCreateManyArgs} args - Arguments to create many Events.
         * @example
         * // Create many Events
         * const event = await prisma.event.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends EventCreateManyArgs>(
            args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Create many Events and returns the data saved in the database.
         * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
         * @example
         * // Create many Events
         * const event = await prisma.event.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Events and only return the `id`
         * const eventWithIdOnly = await prisma.event.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends EventCreateManyAndReturnArgs>(
            args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$EventPayload<ExtArgs>,
                T,
                "createManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Delete a Event.
         * @param {EventDeleteArgs} args - Arguments to delete one Event.
         * @example
         * // Delete one Event
         * const Event = await prisma.event.delete({
         *   where: {
         *     // ... filter to delete one Event
         *   }
         * })
         *
         */
        delete<T extends EventDeleteArgs>(
            args: SelectSubset<T, EventDeleteArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Update one Event.
         * @param {EventUpdateArgs} args - Arguments to update one Event.
         * @example
         * // Update one Event
         * const event = await prisma.event.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends EventUpdateArgs>(
            args: SelectSubset<T, EventUpdateArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Delete zero or more Events.
         * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
         * @example
         * // Delete a few Events
         * const { count } = await prisma.event.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends EventDeleteManyArgs>(
            args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Events.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Events
         * const event = await prisma.event.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends EventUpdateManyArgs>(
            args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Events and returns the data updated in the database.
         * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
         * @example
         * // Update many Events
         * const event = await prisma.event.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Events and only return the `id`
         * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(
            args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$EventPayload<ExtArgs>,
                T,
                "updateManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Create or update one Event.
         * @param {EventUpsertArgs} args - Arguments to update or create a Event.
         * @example
         * // Update or create a Event
         * const event = await prisma.event.upsert({
         *   create: {
         *     // ... data to create a Event
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the Event we want to update
         *   }
         * })
         */
        upsert<T extends EventUpsertArgs>(
            args: SelectSubset<T, EventUpsertArgs<ExtArgs>>,
        ): Prisma__EventClient<
            $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Count the number of Events.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventCountArgs} args - Arguments to filter Events to count.
         * @example
         * // Count the number of Events
         * const count = await prisma.event.count({
         *   where: {
         *     // ... the filter for the Events we want to count
         *   }
         * })
         **/
        count<T extends EventCountArgs>(
            args?: Subset<T, EventCountArgs>,
        ): Prisma.PrismaPromise<
            T extends $Utils.Record<"select", any>
                ? T["select"] extends true
                    ? number
                    : GetScalarType<T["select"], EventCountAggregateOutputType>
                : number
        >;

        /**
         * Allows you to perform aggregations operations on a Event.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends EventAggregateArgs>(
            args: Subset<T, EventAggregateArgs>,
        ): Prisma.PrismaPromise<GetEventAggregateType<T>>;

        /**
         * Group by Event.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {EventGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends EventGroupByArgs,
            HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
            OrderByArg extends (True extends HasSelectOrTake
                ? { orderBy: EventGroupByArgs["orderBy"] }
                : { orderBy?: EventGroupByArgs["orderBy"] }),
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
            ByFields extends MaybeTupleToUnion<T["by"]>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T["having"]>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends (T["by"] extends never[] ? True : False),
            InputErrors extends (ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                  ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                              : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
                    }[HavingFields]
                  : "take" extends Keys<T>
                    ? "orderBy" extends Keys<T>
                        ? ByValid extends True
                            ? {}
                            : {
                                  [P in OrderFields]: P extends ByFields
                                      ? never
                                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                              }[OrderFields]
                        : 'Error: If you provide "take", you also need to provide "orderBy"'
                    : "skip" extends Keys<T>
                      ? "orderBy" extends Keys<T>
                          ? ByValid extends True
                              ? {}
                              : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                                }[OrderFields]
                          : 'Error: If you provide "skip", you also need to provide "orderBy"'
                      : ByValid extends True
                        ? {}
                        : {
                              [P in OrderFields]: P extends ByFields
                                  ? never
                                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                          }[OrderFields]),
        >(
            args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors,
        ): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        /**
         * Fields of the Event model
         */
        readonly fields: EventFieldRefs;
    }

    /**
     * The delegate class that acts as a "Promise-like" for Event.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__EventClient<
        T,
        Null = never,
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        conflict<T extends ConflictDefaultArgs<ExtArgs> = {}>(
            args?: Subset<T, ConflictDefaultArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            | $Result.GetResult<
                  Prisma.$ConflictPayload<ExtArgs>,
                  T,
                  "findUniqueOrThrow",
                  GlobalOmitOptions
              >
            | Null,
            Null,
            ExtArgs,
            GlobalOmitOptions
        >;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(
            onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
        ): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the Event model
     */
    interface EventFieldRefs {
        readonly id: FieldRef<"Event", "String">;
        readonly conflictId: FieldRef<"Event", "String">;
        readonly at: FieldRef<"Event", "DateTime">;
        readonly by: FieldRef<"Event", "String">;
        readonly what: FieldRef<"Event", "String">;
    }

    // Custom InputTypes
    /**
     * Event findUnique
     */
    export type EventFindUniqueArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * Filter, which Event to fetch.
         */
        where: EventWhereUniqueInput;
    };

    /**
     * Event findUniqueOrThrow
     */
    export type EventFindUniqueOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * Filter, which Event to fetch.
         */
        where: EventWhereUniqueInput;
    };

    /**
     * Event findFirst
     */
    export type EventFindFirstArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * Filter, which Event to fetch.
         */
        where?: EventWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Events to fetch.
         */
        orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Events.
         */
        cursor?: EventWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Events from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Events.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Events.
         */
        distinct?: EventScalarFieldEnum | EventScalarFieldEnum[];
    };

    /**
     * Event findFirstOrThrow
     */
    export type EventFindFirstOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * Filter, which Event to fetch.
         */
        where?: EventWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Events to fetch.
         */
        orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Events.
         */
        cursor?: EventWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Events from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Events.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Events.
         */
        distinct?: EventScalarFieldEnum | EventScalarFieldEnum[];
    };

    /**
     * Event findMany
     */
    export type EventFindManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * Filter, which Events to fetch.
         */
        where?: EventWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Events to fetch.
         */
        orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing Events.
         */
        cursor?: EventWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Events from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Events.
         */
        skip?: number;
        distinct?: EventScalarFieldEnum | EventScalarFieldEnum[];
    };

    /**
     * Event create
     */
    export type EventCreateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * The data needed to create a Event.
         */
        data: XOR<EventCreateInput, EventUncheckedCreateInput>;
    };

    /**
     * Event createMany
     */
    export type EventCreateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to create many Events.
         */
        data: EventCreateManyInput | EventCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * Event createManyAndReturn
     */
    export type EventCreateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelectCreateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * The data used to create many Events.
         */
        data: EventCreateManyInput | EventCreateManyInput[];
        skipDuplicates?: boolean;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventIncludeCreateManyAndReturn<ExtArgs> | null;
    };

    /**
     * Event update
     */
    export type EventUpdateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * The data needed to update a Event.
         */
        data: XOR<EventUpdateInput, EventUncheckedUpdateInput>;
        /**
         * Choose, which Event to update.
         */
        where: EventWhereUniqueInput;
    };

    /**
     * Event updateMany
     */
    export type EventUpdateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to update Events.
         */
        data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>;
        /**
         * Filter which Events to update
         */
        where?: EventWhereInput;
        /**
         * Limit how many Events to update.
         */
        limit?: number;
    };

    /**
     * Event updateManyAndReturn
     */
    export type EventUpdateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelectUpdateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * The data used to update Events.
         */
        data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>;
        /**
         * Filter which Events to update
         */
        where?: EventWhereInput;
        /**
         * Limit how many Events to update.
         */
        limit?: number;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null;
    };

    /**
     * Event upsert
     */
    export type EventUpsertArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * The filter to search for the Event to update in case it exists.
         */
        where: EventWhereUniqueInput;
        /**
         * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
         */
        create: XOR<EventCreateInput, EventUncheckedCreateInput>;
        /**
         * In case the Event was found with the provided `where` argument, update it with this data.
         */
        update: XOR<EventUpdateInput, EventUncheckedUpdateInput>;
    };

    /**
     * Event delete
     */
    export type EventDeleteArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
        /**
         * Filter which Event to delete.
         */
        where: EventWhereUniqueInput;
    };

    /**
     * Event deleteMany
     */
    export type EventDeleteManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Events to delete
         */
        where?: EventWhereInput;
        /**
         * Limit how many Events to delete.
         */
        limit?: number;
    };

    /**
     * Event without action
     */
    export type EventDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Event
         */
        select?: EventSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Event
         */
        omit?: EventOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: EventInclude<ExtArgs> | null;
    };

    /**
     * Model View
     */

    export type AggregateView = {
        _count: ViewCountAggregateOutputType | null;
        _avg: ViewAvgAggregateOutputType | null;
        _sum: ViewSumAggregateOutputType | null;
        _min: ViewMinAggregateOutputType | null;
        _max: ViewMaxAggregateOutputType | null;
    };

    export type ViewAvgAggregateOutputType = {
        chatId: number | null;
        messageId: number | null;
    };

    export type ViewSumAggregateOutputType = {
        chatId: bigint | null;
        messageId: number | null;
    };

    export type ViewMinAggregateOutputType = {
        id: string | null;
        conflictId: string | null;
        surface: $Enums.Surface | null;
        audience: $Enums.Audience | null;
        channel: string | null;
        ts: string | null;
        threadTs: string | null;
        chatId: bigint | null;
        messageId: number | null;
    };

    export type ViewMaxAggregateOutputType = {
        id: string | null;
        conflictId: string | null;
        surface: $Enums.Surface | null;
        audience: $Enums.Audience | null;
        channel: string | null;
        ts: string | null;
        threadTs: string | null;
        chatId: bigint | null;
        messageId: number | null;
    };

    export type ViewCountAggregateOutputType = {
        id: number;
        conflictId: number;
        surface: number;
        audience: number;
        channel: number;
        ts: number;
        threadTs: number;
        chatId: number;
        messageId: number;
        _all: number;
    };

    export type ViewAvgAggregateInputType = {
        chatId?: true;
        messageId?: true;
    };

    export type ViewSumAggregateInputType = {
        chatId?: true;
        messageId?: true;
    };

    export type ViewMinAggregateInputType = {
        id?: true;
        conflictId?: true;
        surface?: true;
        audience?: true;
        channel?: true;
        ts?: true;
        threadTs?: true;
        chatId?: true;
        messageId?: true;
    };

    export type ViewMaxAggregateInputType = {
        id?: true;
        conflictId?: true;
        surface?: true;
        audience?: true;
        channel?: true;
        ts?: true;
        threadTs?: true;
        chatId?: true;
        messageId?: true;
    };

    export type ViewCountAggregateInputType = {
        id?: true;
        conflictId?: true;
        surface?: true;
        audience?: true;
        channel?: true;
        ts?: true;
        threadTs?: true;
        chatId?: true;
        messageId?: true;
        _all?: true;
    };

    export type ViewAggregateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which View to aggregate.
         */
        where?: ViewWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Views to fetch.
         */
        orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: ViewWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Views from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Views.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned Views
         **/
        _count?: true | ViewCountAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to average
         **/
        _avg?: ViewAvgAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to sum
         **/
        _sum?: ViewSumAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: ViewMinAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: ViewMaxAggregateInputType;
    };

    export type GetViewAggregateType<T extends ViewAggregateArgs> = {
        [P in keyof T & keyof AggregateView]: P extends "_count" | "count"
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateView[P]>
            : GetScalarType<T[P], AggregateView[P]>;
    };

    export type ViewGroupByArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: ViewWhereInput;
        orderBy?: ViewOrderByWithAggregationInput | ViewOrderByWithAggregationInput[];
        by: ViewScalarFieldEnum[] | ViewScalarFieldEnum;
        having?: ViewScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: ViewCountAggregateInputType | true;
        _avg?: ViewAvgAggregateInputType;
        _sum?: ViewSumAggregateInputType;
        _min?: ViewMinAggregateInputType;
        _max?: ViewMaxAggregateInputType;
    };

    export type ViewGroupByOutputType = {
        id: string;
        conflictId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel: string | null;
        ts: string | null;
        threadTs: string | null;
        chatId: bigint | null;
        messageId: number | null;
        _count: ViewCountAggregateOutputType | null;
        _avg: ViewAvgAggregateOutputType | null;
        _sum: ViewSumAggregateOutputType | null;
        _min: ViewMinAggregateOutputType | null;
        _max: ViewMaxAggregateOutputType | null;
    };

    type GetViewGroupByPayload<T extends ViewGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<ViewGroupByOutputType, T["by"]> & {
                [P in keyof T & keyof ViewGroupByOutputType]: P extends "_count"
                    ? T[P] extends boolean
                        ? number
                        : GetScalarType<T[P], ViewGroupByOutputType[P]>
                    : GetScalarType<T[P], ViewGroupByOutputType[P]>;
            }
        >
    >;

    export type ViewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetSelect<
            {
                id?: boolean;
                conflictId?: boolean;
                surface?: boolean;
                audience?: boolean;
                channel?: boolean;
                ts?: boolean;
                threadTs?: boolean;
                chatId?: boolean;
                messageId?: boolean;
                conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["view"]
        >;

    export type ViewSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            conflictId?: boolean;
            surface?: boolean;
            audience?: boolean;
            channel?: boolean;
            ts?: boolean;
            threadTs?: boolean;
            chatId?: boolean;
            messageId?: boolean;
            conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["view"]
    >;

    export type ViewSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            conflictId?: boolean;
            surface?: boolean;
            audience?: boolean;
            channel?: boolean;
            ts?: boolean;
            threadTs?: boolean;
            chatId?: boolean;
            messageId?: boolean;
            conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["view"]
    >;

    export type ViewSelectScalar = {
        id?: boolean;
        conflictId?: boolean;
        surface?: boolean;
        audience?: boolean;
        channel?: boolean;
        ts?: boolean;
        threadTs?: boolean;
        chatId?: boolean;
        messageId?: boolean;
    };

    export type ViewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<
            | "id"
            | "conflictId"
            | "surface"
            | "audience"
            | "channel"
            | "ts"
            | "threadTs"
            | "chatId"
            | "messageId",
            ExtArgs["result"]["view"]
        >;
    export type ViewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
    };
    export type ViewIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
    };
    export type ViewIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        conflict?: boolean | ConflictDefaultArgs<ExtArgs>;
    };

    export type $ViewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "View";
        objects: {
            conflict: Prisma.$ConflictPayload<ExtArgs>;
        };
        scalars: $Extensions.GetPayloadResult<
            {
                id: string;
                conflictId: string;
                surface: $Enums.Surface;
                audience: $Enums.Audience;
                channel: string | null;
                ts: string | null;
                threadTs: string | null;
                chatId: bigint | null;
                messageId: number | null;
            },
            ExtArgs["result"]["view"]
        >;
        composites: {};
    };

    type ViewGetPayload<S extends boolean | null | undefined | ViewDefaultArgs> = $Result.GetResult<
        Prisma.$ViewPayload,
        S
    >;

    type ViewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
        ViewFindManyArgs,
        "select" | "include" | "distinct" | "omit"
    > & {
        select?: ViewCountAggregateInputType | true;
    };

    export interface ViewDelegate<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > {
        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["View"]; meta: { name: "View" } };
        /**
         * Find zero or one View that matches the filter.
         * @param {ViewFindUniqueArgs} args - Arguments to find a View
         * @example
         * // Get one View
         * const view = await prisma.view.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends ViewFindUniqueArgs>(
            args: SelectSubset<T, ViewFindUniqueArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<
                Prisma.$ViewPayload<ExtArgs>,
                T,
                "findUnique",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find one View that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {ViewFindUniqueOrThrowArgs} args - Arguments to find a View
         * @example
         * // Get one View
         * const view = await prisma.view.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends ViewFindUniqueOrThrowArgs>(
            args: SelectSubset<T, ViewFindUniqueOrThrowArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<
                Prisma.$ViewPayload<ExtArgs>,
                T,
                "findUniqueOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first View that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewFindFirstArgs} args - Arguments to find a View
         * @example
         * // Get one View
         * const view = await prisma.view.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends ViewFindFirstArgs>(
            args?: SelectSubset<T, ViewFindFirstArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<
                Prisma.$ViewPayload<ExtArgs>,
                T,
                "findFirst",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first View that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewFindFirstOrThrowArgs} args - Arguments to find a View
         * @example
         * // Get one View
         * const view = await prisma.view.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends ViewFindFirstOrThrowArgs>(
            args?: SelectSubset<T, ViewFindFirstOrThrowArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<
                Prisma.$ViewPayload<ExtArgs>,
                T,
                "findFirstOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find zero or more Views that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Views
         * const views = await prisma.view.findMany()
         *
         * // Get first 10 Views
         * const views = await prisma.view.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const viewWithIdOnly = await prisma.view.findMany({ select: { id: true } })
         *
         */
        findMany<T extends ViewFindManyArgs>(
            args?: SelectSubset<T, ViewFindManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
        >;

        /**
         * Create a View.
         * @param {ViewCreateArgs} args - Arguments to create a View.
         * @example
         * // Create one View
         * const View = await prisma.view.create({
         *   data: {
         *     // ... data to create a View
         *   }
         * })
         *
         */
        create<T extends ViewCreateArgs>(
            args: SelectSubset<T, ViewCreateArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Create many Views.
         * @param {ViewCreateManyArgs} args - Arguments to create many Views.
         * @example
         * // Create many Views
         * const view = await prisma.view.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends ViewCreateManyArgs>(
            args?: SelectSubset<T, ViewCreateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Create many Views and returns the data saved in the database.
         * @param {ViewCreateManyAndReturnArgs} args - Arguments to create many Views.
         * @example
         * // Create many Views
         * const view = await prisma.view.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Views and only return the `id`
         * const viewWithIdOnly = await prisma.view.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends ViewCreateManyAndReturnArgs>(
            args?: SelectSubset<T, ViewCreateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$ViewPayload<ExtArgs>,
                T,
                "createManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Delete a View.
         * @param {ViewDeleteArgs} args - Arguments to delete one View.
         * @example
         * // Delete one View
         * const View = await prisma.view.delete({
         *   where: {
         *     // ... filter to delete one View
         *   }
         * })
         *
         */
        delete<T extends ViewDeleteArgs>(
            args: SelectSubset<T, ViewDeleteArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Update one View.
         * @param {ViewUpdateArgs} args - Arguments to update one View.
         * @example
         * // Update one View
         * const view = await prisma.view.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends ViewUpdateArgs>(
            args: SelectSubset<T, ViewUpdateArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Delete zero or more Views.
         * @param {ViewDeleteManyArgs} args - Arguments to filter Views to delete.
         * @example
         * // Delete a few Views
         * const { count } = await prisma.view.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends ViewDeleteManyArgs>(
            args?: SelectSubset<T, ViewDeleteManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Views.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Views
         * const view = await prisma.view.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends ViewUpdateManyArgs>(
            args: SelectSubset<T, ViewUpdateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Views and returns the data updated in the database.
         * @param {ViewUpdateManyAndReturnArgs} args - Arguments to update many Views.
         * @example
         * // Update many Views
         * const view = await prisma.view.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Views and only return the `id`
         * const viewWithIdOnly = await prisma.view.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends ViewUpdateManyAndReturnArgs>(
            args: SelectSubset<T, ViewUpdateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$ViewPayload<ExtArgs>,
                T,
                "updateManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Create or update one View.
         * @param {ViewUpsertArgs} args - Arguments to update or create a View.
         * @example
         * // Update or create a View
         * const view = await prisma.view.upsert({
         *   create: {
         *     // ... data to create a View
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the View we want to update
         *   }
         * })
         */
        upsert<T extends ViewUpsertArgs>(
            args: SelectSubset<T, ViewUpsertArgs<ExtArgs>>,
        ): Prisma__ViewClient<
            $Result.GetResult<Prisma.$ViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Count the number of Views.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewCountArgs} args - Arguments to filter Views to count.
         * @example
         * // Count the number of Views
         * const count = await prisma.view.count({
         *   where: {
         *     // ... the filter for the Views we want to count
         *   }
         * })
         **/
        count<T extends ViewCountArgs>(
            args?: Subset<T, ViewCountArgs>,
        ): Prisma.PrismaPromise<
            T extends $Utils.Record<"select", any>
                ? T["select"] extends true
                    ? number
                    : GetScalarType<T["select"], ViewCountAggregateOutputType>
                : number
        >;

        /**
         * Allows you to perform aggregations operations on a View.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends ViewAggregateArgs>(
            args: Subset<T, ViewAggregateArgs>,
        ): Prisma.PrismaPromise<GetViewAggregateType<T>>;

        /**
         * Group by View.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ViewGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends ViewGroupByArgs,
            HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
            OrderByArg extends (True extends HasSelectOrTake
                ? { orderBy: ViewGroupByArgs["orderBy"] }
                : { orderBy?: ViewGroupByArgs["orderBy"] }),
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
            ByFields extends MaybeTupleToUnion<T["by"]>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T["having"]>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends (T["by"] extends never[] ? True : False),
            InputErrors extends (ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                  ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                              : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
                    }[HavingFields]
                  : "take" extends Keys<T>
                    ? "orderBy" extends Keys<T>
                        ? ByValid extends True
                            ? {}
                            : {
                                  [P in OrderFields]: P extends ByFields
                                      ? never
                                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                              }[OrderFields]
                        : 'Error: If you provide "take", you also need to provide "orderBy"'
                    : "skip" extends Keys<T>
                      ? "orderBy" extends Keys<T>
                          ? ByValid extends True
                              ? {}
                              : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                                }[OrderFields]
                          : 'Error: If you provide "skip", you also need to provide "orderBy"'
                      : ByValid extends True
                        ? {}
                        : {
                              [P in OrderFields]: P extends ByFields
                                  ? never
                                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                          }[OrderFields]),
        >(
            args: SubsetIntersection<T, ViewGroupByArgs, OrderByArg> & InputErrors,
        ): {} extends InputErrors ? GetViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        /**
         * Fields of the View model
         */
        readonly fields: ViewFieldRefs;
    }

    /**
     * The delegate class that acts as a "Promise-like" for View.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__ViewClient<
        T,
        Null = never,
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        conflict<T extends ConflictDefaultArgs<ExtArgs> = {}>(
            args?: Subset<T, ConflictDefaultArgs<ExtArgs>>,
        ): Prisma__ConflictClient<
            | $Result.GetResult<
                  Prisma.$ConflictPayload<ExtArgs>,
                  T,
                  "findUniqueOrThrow",
                  GlobalOmitOptions
              >
            | Null,
            Null,
            ExtArgs,
            GlobalOmitOptions
        >;
        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
        ): $Utils.JsPromise<TResult1 | TResult2>;
        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(
            onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
        ): $Utils.JsPromise<T | TResult>;
        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }

    /**
     * Fields of the View model
     */
    interface ViewFieldRefs {
        readonly id: FieldRef<"View", "String">;
        readonly conflictId: FieldRef<"View", "String">;
        readonly surface: FieldRef<"View", "Surface">;
        readonly audience: FieldRef<"View", "Audience">;
        readonly channel: FieldRef<"View", "String">;
        readonly ts: FieldRef<"View", "String">;
        readonly threadTs: FieldRef<"View", "String">;
        readonly chatId: FieldRef<"View", "BigInt">;
        readonly messageId: FieldRef<"View", "Int">;
    }

    // Custom InputTypes
    /**
     * View findUnique
     */
    export type ViewFindUniqueArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
        /**
         * Filter, which View to fetch.
         */
        where: ViewWhereUniqueInput;
    };

    /**
     * View findUniqueOrThrow
     */
    export type ViewFindUniqueOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
        /**
         * Filter, which View to fetch.
         */
        where: ViewWhereUniqueInput;
    };

    /**
     * View findFirst
     */
    export type ViewFindFirstArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
        /**
         * Filter, which View to fetch.
         */
        where?: ViewWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Views to fetch.
         */
        orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Views.
         */
        cursor?: ViewWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Views from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Views.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Views.
         */
        distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[];
    };

    /**
     * View findFirstOrThrow
     */
    export type ViewFindFirstOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
        /**
         * Filter, which View to fetch.
         */
        where?: ViewWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Views to fetch.
         */
        orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Views.
         */
        cursor?: ViewWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Views from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Views.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Views.
         */
        distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[];
    };

    /**
     * View findMany
     */
    export type ViewFindManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
        /**
         * Filter, which Views to fetch.
         */
        where?: ViewWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Views to fetch.
         */
        orderBy?: ViewOrderByWithRelationInput | ViewOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing Views.
         */
        cursor?: ViewWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Views from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Views.
         */
        skip?: number;
        distinct?: ViewScalarFieldEnum | ViewScalarFieldEnum[];
    };

    /**
     * View create
     */
    export type ViewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            /**
             * Select specific fields to fetch from the View
             */
            select?: ViewSelect<ExtArgs> | null;
            /**
             * Omit specific fields from the View
             */
            omit?: ViewOmit<ExtArgs> | null;
            /**
             * Choose, which related nodes to fetch as well
             */
            include?: ViewInclude<ExtArgs> | null;
            /**
             * The data needed to create a View.
             */
            data: XOR<ViewCreateInput, ViewUncheckedCreateInput>;
        };

    /**
     * View createMany
     */
    export type ViewCreateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to create many Views.
         */
        data: ViewCreateManyInput | ViewCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * View createManyAndReturn
     */
    export type ViewCreateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelectCreateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * The data used to create many Views.
         */
        data: ViewCreateManyInput | ViewCreateManyInput[];
        skipDuplicates?: boolean;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewIncludeCreateManyAndReturn<ExtArgs> | null;
    };

    /**
     * View update
     */
    export type ViewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            /**
             * Select specific fields to fetch from the View
             */
            select?: ViewSelect<ExtArgs> | null;
            /**
             * Omit specific fields from the View
             */
            omit?: ViewOmit<ExtArgs> | null;
            /**
             * Choose, which related nodes to fetch as well
             */
            include?: ViewInclude<ExtArgs> | null;
            /**
             * The data needed to update a View.
             */
            data: XOR<ViewUpdateInput, ViewUncheckedUpdateInput>;
            /**
             * Choose, which View to update.
             */
            where: ViewWhereUniqueInput;
        };

    /**
     * View updateMany
     */
    export type ViewUpdateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to update Views.
         */
        data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyInput>;
        /**
         * Filter which Views to update
         */
        where?: ViewWhereInput;
        /**
         * Limit how many Views to update.
         */
        limit?: number;
    };

    /**
     * View updateManyAndReturn
     */
    export type ViewUpdateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelectUpdateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * The data used to update Views.
         */
        data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyInput>;
        /**
         * Filter which Views to update
         */
        where?: ViewWhereInput;
        /**
         * Limit how many Views to update.
         */
        limit?: number;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewIncludeUpdateManyAndReturn<ExtArgs> | null;
    };

    /**
     * View upsert
     */
    export type ViewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            /**
             * Select specific fields to fetch from the View
             */
            select?: ViewSelect<ExtArgs> | null;
            /**
             * Omit specific fields from the View
             */
            omit?: ViewOmit<ExtArgs> | null;
            /**
             * Choose, which related nodes to fetch as well
             */
            include?: ViewInclude<ExtArgs> | null;
            /**
             * The filter to search for the View to update in case it exists.
             */
            where: ViewWhereUniqueInput;
            /**
             * In case the View found by the `where` argument doesn't exist, create a new View with this data.
             */
            create: XOR<ViewCreateInput, ViewUncheckedCreateInput>;
            /**
             * In case the View was found with the provided `where` argument, update it with this data.
             */
            update: XOR<ViewUpdateInput, ViewUncheckedUpdateInput>;
        };

    /**
     * View delete
     */
    export type ViewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            /**
             * Select specific fields to fetch from the View
             */
            select?: ViewSelect<ExtArgs> | null;
            /**
             * Omit specific fields from the View
             */
            omit?: ViewOmit<ExtArgs> | null;
            /**
             * Choose, which related nodes to fetch as well
             */
            include?: ViewInclude<ExtArgs> | null;
            /**
             * Filter which View to delete.
             */
            where: ViewWhereUniqueInput;
        };

    /**
     * View deleteMany
     */
    export type ViewDeleteManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Views to delete
         */
        where?: ViewWhereInput;
        /**
         * Limit how many Views to delete.
         */
        limit?: number;
    };

    /**
     * View without action
     */
    export type ViewDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the View
         */
        select?: ViewSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the View
         */
        omit?: ViewOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: ViewInclude<ExtArgs> | null;
    };

    /**
     * Enums
     */

    export const TransactionIsolationLevel: {
        ReadUncommitted: "ReadUncommitted";
        ReadCommitted: "ReadCommitted";
        RepeatableRead: "RepeatableRead";
        Serializable: "Serializable";
    };

    export type TransactionIsolationLevel =
        (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

    export const DecisionScalarFieldEnum: {
        id: "id";
        createdAt: "createdAt";
        surface: "surface";
        threadKey: "threadKey";
        threadName: "threadName";
        decidedBy: "decidedBy";
        rawText: "rawText";
        subsystem: "subsystem";
        condition: "condition";
        action: "action";
        supersededById: "supersededById";
    };

    export type DecisionScalarFieldEnum =
        (typeof DecisionScalarFieldEnum)[keyof typeof DecisionScalarFieldEnum];

    export const ConflictScalarFieldEnum: {
        id: "id";
        createdAt: "createdAt";
        updatedAt: "updatedAt";
        version: "version";
        decisionAId: "decisionAId";
        decisionBId: "decisionBId";
        status: "status";
        acknowledgedBy: "acknowledgedBy";
        resolution: "resolution";
        framings: "framings";
    };

    export type ConflictScalarFieldEnum =
        (typeof ConflictScalarFieldEnum)[keyof typeof ConflictScalarFieldEnum];

    export const EventScalarFieldEnum: {
        id: "id";
        conflictId: "conflictId";
        at: "at";
        by: "by";
        what: "what";
    };

    export type EventScalarFieldEnum =
        (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum];

    export const ViewScalarFieldEnum: {
        id: "id";
        conflictId: "conflictId";
        surface: "surface";
        audience: "audience";
        channel: "channel";
        ts: "ts";
        threadTs: "threadTs";
        chatId: "chatId";
        messageId: "messageId";
    };

    export type ViewScalarFieldEnum =
        (typeof ViewScalarFieldEnum)[keyof typeof ViewScalarFieldEnum];

    export const SortOrder: {
        asc: "asc";
        desc: "desc";
    };

    export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

    export const JsonNullValueInput: {
        JsonNull: typeof JsonNull;
    };

    export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

    export const QueryMode: {
        default: "default";
        insensitive: "insensitive";
    };

    export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

    export const NullsOrder: {
        first: "first";
        last: "last";
    };

    export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

    export const JsonNullValueFilter: {
        DbNull: typeof DbNull;
        JsonNull: typeof JsonNull;
        AnyNull: typeof AnyNull;
    };

    export type JsonNullValueFilter =
        (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

    /**
     * Field references
     */

    /**
     * Reference to a field of type 'String'
     */
    export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "String">;

    /**
     * Reference to a field of type 'String[]'
     */
    export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "String[]">;

    /**
     * Reference to a field of type 'DateTime'
     */
    export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "DateTime">;

    /**
     * Reference to a field of type 'DateTime[]'
     */
    export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "DateTime[]"
    >;

    /**
     * Reference to a field of type 'Surface'
     */
    export type EnumSurfaceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Surface">;

    /**
     * Reference to a field of type 'Surface[]'
     */
    export type ListEnumSurfaceFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Surface[]"
    >;

    /**
     * Reference to a field of type 'Subsystem'
     */
    export type EnumSubsystemFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Subsystem"
    >;

    /**
     * Reference to a field of type 'Subsystem[]'
     */
    export type ListEnumSubsystemFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Subsystem[]"
    >;

    /**
     * Reference to a field of type 'Condition'
     */
    export type EnumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Condition"
    >;

    /**
     * Reference to a field of type 'Condition[]'
     */
    export type ListEnumConditionFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Condition[]"
    >;

    /**
     * Reference to a field of type 'ClaimAction'
     */
    export type EnumClaimActionFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "ClaimAction"
    >;

    /**
     * Reference to a field of type 'ClaimAction[]'
     */
    export type ListEnumClaimActionFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "ClaimAction[]"
    >;

    /**
     * Reference to a field of type 'Int'
     */
    export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int">;

    /**
     * Reference to a field of type 'Int[]'
     */
    export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int[]">;

    /**
     * Reference to a field of type 'ConflictStatus'
     */
    export type EnumConflictStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "ConflictStatus"
    >;

    /**
     * Reference to a field of type 'ConflictStatus[]'
     */
    export type ListEnumConflictStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "ConflictStatus[]"
    >;

    /**
     * Reference to a field of type 'Json'
     */
    export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Json">;

    /**
     * Reference to a field of type 'QueryMode'
     */
    export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "QueryMode"
    >;

    /**
     * Reference to a field of type 'Audience'
     */
    export type EnumAudienceFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Audience"
    >;

    /**
     * Reference to a field of type 'Audience[]'
     */
    export type ListEnumAudienceFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Audience[]"
    >;

    /**
     * Reference to a field of type 'BigInt'
     */
    export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "BigInt">;

    /**
     * Reference to a field of type 'BigInt[]'
     */
    export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "BigInt[]">;

    /**
     * Reference to a field of type 'Float'
     */
    export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Float">;

    /**
     * Reference to a field of type 'Float[]'
     */
    export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Float[]">;

    /**
     * Deep Input Types
     */

    export type DecisionWhereInput = {
        AND?: DecisionWhereInput | DecisionWhereInput[];
        OR?: DecisionWhereInput[];
        NOT?: DecisionWhereInput | DecisionWhereInput[];
        id?: StringFilter<"Decision"> | string;
        createdAt?: DateTimeFilter<"Decision"> | Date | string;
        surface?: EnumSurfaceFilter<"Decision"> | $Enums.Surface;
        threadKey?: StringFilter<"Decision"> | string;
        threadName?: StringFilter<"Decision"> | string;
        decidedBy?: StringFilter<"Decision"> | string;
        rawText?: StringFilter<"Decision"> | string;
        subsystem?: EnumSubsystemFilter<"Decision"> | $Enums.Subsystem;
        condition?: EnumConditionFilter<"Decision"> | $Enums.Condition;
        action?: EnumClaimActionFilter<"Decision"> | $Enums.ClaimAction;
        supersededById?: StringNullableFilter<"Decision"> | string | null;
        conflictsAsA?: ConflictListRelationFilter;
        conflictsAsB?: ConflictListRelationFilter;
    };

    export type DecisionOrderByWithRelationInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        surface?: SortOrder;
        threadKey?: SortOrder;
        threadName?: SortOrder;
        decidedBy?: SortOrder;
        rawText?: SortOrder;
        subsystem?: SortOrder;
        condition?: SortOrder;
        action?: SortOrder;
        supersededById?: SortOrderInput | SortOrder;
        conflictsAsA?: ConflictOrderByRelationAggregateInput;
        conflictsAsB?: ConflictOrderByRelationAggregateInput;
    };

    export type DecisionWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            supersededById?: string;
            AND?: DecisionWhereInput | DecisionWhereInput[];
            OR?: DecisionWhereInput[];
            NOT?: DecisionWhereInput | DecisionWhereInput[];
            createdAt?: DateTimeFilter<"Decision"> | Date | string;
            surface?: EnumSurfaceFilter<"Decision"> | $Enums.Surface;
            threadKey?: StringFilter<"Decision"> | string;
            threadName?: StringFilter<"Decision"> | string;
            decidedBy?: StringFilter<"Decision"> | string;
            rawText?: StringFilter<"Decision"> | string;
            subsystem?: EnumSubsystemFilter<"Decision"> | $Enums.Subsystem;
            condition?: EnumConditionFilter<"Decision"> | $Enums.Condition;
            action?: EnumClaimActionFilter<"Decision"> | $Enums.ClaimAction;
            conflictsAsA?: ConflictListRelationFilter;
            conflictsAsB?: ConflictListRelationFilter;
        },
        "id" | "supersededById"
    >;

    export type DecisionOrderByWithAggregationInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        surface?: SortOrder;
        threadKey?: SortOrder;
        threadName?: SortOrder;
        decidedBy?: SortOrder;
        rawText?: SortOrder;
        subsystem?: SortOrder;
        condition?: SortOrder;
        action?: SortOrder;
        supersededById?: SortOrderInput | SortOrder;
        _count?: DecisionCountOrderByAggregateInput;
        _max?: DecisionMaxOrderByAggregateInput;
        _min?: DecisionMinOrderByAggregateInput;
    };

    export type DecisionScalarWhereWithAggregatesInput = {
        AND?: DecisionScalarWhereWithAggregatesInput | DecisionScalarWhereWithAggregatesInput[];
        OR?: DecisionScalarWhereWithAggregatesInput[];
        NOT?: DecisionScalarWhereWithAggregatesInput | DecisionScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Decision"> | string;
        createdAt?: DateTimeWithAggregatesFilter<"Decision"> | Date | string;
        surface?: EnumSurfaceWithAggregatesFilter<"Decision"> | $Enums.Surface;
        threadKey?: StringWithAggregatesFilter<"Decision"> | string;
        threadName?: StringWithAggregatesFilter<"Decision"> | string;
        decidedBy?: StringWithAggregatesFilter<"Decision"> | string;
        rawText?: StringWithAggregatesFilter<"Decision"> | string;
        subsystem?: EnumSubsystemWithAggregatesFilter<"Decision"> | $Enums.Subsystem;
        condition?: EnumConditionWithAggregatesFilter<"Decision"> | $Enums.Condition;
        action?: EnumClaimActionWithAggregatesFilter<"Decision"> | $Enums.ClaimAction;
        supersededById?: StringNullableWithAggregatesFilter<"Decision"> | string | null;
    };

    export type ConflictWhereInput = {
        AND?: ConflictWhereInput | ConflictWhereInput[];
        OR?: ConflictWhereInput[];
        NOT?: ConflictWhereInput | ConflictWhereInput[];
        id?: StringFilter<"Conflict"> | string;
        createdAt?: DateTimeFilter<"Conflict"> | Date | string;
        updatedAt?: DateTimeFilter<"Conflict"> | Date | string;
        version?: IntFilter<"Conflict"> | number;
        decisionAId?: StringFilter<"Conflict"> | string;
        decisionBId?: StringFilter<"Conflict"> | string;
        status?: EnumConflictStatusFilter<"Conflict"> | $Enums.ConflictStatus;
        acknowledgedBy?: StringNullableFilter<"Conflict"> | string | null;
        resolution?: StringNullableFilter<"Conflict"> | string | null;
        framings?: JsonFilter<"Conflict">;
        decisionA?: XOR<DecisionScalarRelationFilter, DecisionWhereInput>;
        decisionB?: XOR<DecisionScalarRelationFilter, DecisionWhereInput>;
        timeline?: EventListRelationFilter;
        views?: ViewListRelationFilter;
    };

    export type ConflictOrderByWithRelationInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        decisionAId?: SortOrder;
        decisionBId?: SortOrder;
        status?: SortOrder;
        acknowledgedBy?: SortOrderInput | SortOrder;
        resolution?: SortOrderInput | SortOrder;
        framings?: SortOrder;
        decisionA?: DecisionOrderByWithRelationInput;
        decisionB?: DecisionOrderByWithRelationInput;
        timeline?: EventOrderByRelationAggregateInput;
        views?: ViewOrderByRelationAggregateInput;
    };

    export type ConflictWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            decisionAId_decisionBId?: ConflictDecisionAIdDecisionBIdCompoundUniqueInput;
            AND?: ConflictWhereInput | ConflictWhereInput[];
            OR?: ConflictWhereInput[];
            NOT?: ConflictWhereInput | ConflictWhereInput[];
            createdAt?: DateTimeFilter<"Conflict"> | Date | string;
            updatedAt?: DateTimeFilter<"Conflict"> | Date | string;
            version?: IntFilter<"Conflict"> | number;
            decisionAId?: StringFilter<"Conflict"> | string;
            decisionBId?: StringFilter<"Conflict"> | string;
            status?: EnumConflictStatusFilter<"Conflict"> | $Enums.ConflictStatus;
            acknowledgedBy?: StringNullableFilter<"Conflict"> | string | null;
            resolution?: StringNullableFilter<"Conflict"> | string | null;
            framings?: JsonFilter<"Conflict">;
            decisionA?: XOR<DecisionScalarRelationFilter, DecisionWhereInput>;
            decisionB?: XOR<DecisionScalarRelationFilter, DecisionWhereInput>;
            timeline?: EventListRelationFilter;
            views?: ViewListRelationFilter;
        },
        "id" | "decisionAId_decisionBId"
    >;

    export type ConflictOrderByWithAggregationInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        decisionAId?: SortOrder;
        decisionBId?: SortOrder;
        status?: SortOrder;
        acknowledgedBy?: SortOrderInput | SortOrder;
        resolution?: SortOrderInput | SortOrder;
        framings?: SortOrder;
        _count?: ConflictCountOrderByAggregateInput;
        _avg?: ConflictAvgOrderByAggregateInput;
        _max?: ConflictMaxOrderByAggregateInput;
        _min?: ConflictMinOrderByAggregateInput;
        _sum?: ConflictSumOrderByAggregateInput;
    };

    export type ConflictScalarWhereWithAggregatesInput = {
        AND?: ConflictScalarWhereWithAggregatesInput | ConflictScalarWhereWithAggregatesInput[];
        OR?: ConflictScalarWhereWithAggregatesInput[];
        NOT?: ConflictScalarWhereWithAggregatesInput | ConflictScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Conflict"> | string;
        createdAt?: DateTimeWithAggregatesFilter<"Conflict"> | Date | string;
        updatedAt?: DateTimeWithAggregatesFilter<"Conflict"> | Date | string;
        version?: IntWithAggregatesFilter<"Conflict"> | number;
        decisionAId?: StringWithAggregatesFilter<"Conflict"> | string;
        decisionBId?: StringWithAggregatesFilter<"Conflict"> | string;
        status?: EnumConflictStatusWithAggregatesFilter<"Conflict"> | $Enums.ConflictStatus;
        acknowledgedBy?: StringNullableWithAggregatesFilter<"Conflict"> | string | null;
        resolution?: StringNullableWithAggregatesFilter<"Conflict"> | string | null;
        framings?: JsonWithAggregatesFilter<"Conflict">;
    };

    export type EventWhereInput = {
        AND?: EventWhereInput | EventWhereInput[];
        OR?: EventWhereInput[];
        NOT?: EventWhereInput | EventWhereInput[];
        id?: StringFilter<"Event"> | string;
        conflictId?: StringFilter<"Event"> | string;
        at?: DateTimeFilter<"Event"> | Date | string;
        by?: StringFilter<"Event"> | string;
        what?: StringFilter<"Event"> | string;
        conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>;
    };

    export type EventOrderByWithRelationInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
        conflict?: ConflictOrderByWithRelationInput;
    };

    export type EventWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            AND?: EventWhereInput | EventWhereInput[];
            OR?: EventWhereInput[];
            NOT?: EventWhereInput | EventWhereInput[];
            conflictId?: StringFilter<"Event"> | string;
            at?: DateTimeFilter<"Event"> | Date | string;
            by?: StringFilter<"Event"> | string;
            what?: StringFilter<"Event"> | string;
            conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>;
        },
        "id"
    >;

    export type EventOrderByWithAggregationInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
        _count?: EventCountOrderByAggregateInput;
        _max?: EventMaxOrderByAggregateInput;
        _min?: EventMinOrderByAggregateInput;
    };

    export type EventScalarWhereWithAggregatesInput = {
        AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[];
        OR?: EventScalarWhereWithAggregatesInput[];
        NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Event"> | string;
        conflictId?: StringWithAggregatesFilter<"Event"> | string;
        at?: DateTimeWithAggregatesFilter<"Event"> | Date | string;
        by?: StringWithAggregatesFilter<"Event"> | string;
        what?: StringWithAggregatesFilter<"Event"> | string;
    };

    export type ViewWhereInput = {
        AND?: ViewWhereInput | ViewWhereInput[];
        OR?: ViewWhereInput[];
        NOT?: ViewWhereInput | ViewWhereInput[];
        id?: StringFilter<"View"> | string;
        conflictId?: StringFilter<"View"> | string;
        surface?: EnumSurfaceFilter<"View"> | $Enums.Surface;
        audience?: EnumAudienceFilter<"View"> | $Enums.Audience;
        channel?: StringNullableFilter<"View"> | string | null;
        ts?: StringNullableFilter<"View"> | string | null;
        threadTs?: StringNullableFilter<"View"> | string | null;
        chatId?: BigIntNullableFilter<"View"> | bigint | number | null;
        messageId?: IntNullableFilter<"View"> | number | null;
        conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>;
    };

    export type ViewOrderByWithRelationInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrderInput | SortOrder;
        ts?: SortOrderInput | SortOrder;
        threadTs?: SortOrderInput | SortOrder;
        chatId?: SortOrderInput | SortOrder;
        messageId?: SortOrderInput | SortOrder;
        conflict?: ConflictOrderByWithRelationInput;
    };

    export type ViewWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            AND?: ViewWhereInput | ViewWhereInput[];
            OR?: ViewWhereInput[];
            NOT?: ViewWhereInput | ViewWhereInput[];
            conflictId?: StringFilter<"View"> | string;
            surface?: EnumSurfaceFilter<"View"> | $Enums.Surface;
            audience?: EnumAudienceFilter<"View"> | $Enums.Audience;
            channel?: StringNullableFilter<"View"> | string | null;
            ts?: StringNullableFilter<"View"> | string | null;
            threadTs?: StringNullableFilter<"View"> | string | null;
            chatId?: BigIntNullableFilter<"View"> | bigint | number | null;
            messageId?: IntNullableFilter<"View"> | number | null;
            conflict?: XOR<ConflictScalarRelationFilter, ConflictWhereInput>;
        },
        "id"
    >;

    export type ViewOrderByWithAggregationInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrderInput | SortOrder;
        ts?: SortOrderInput | SortOrder;
        threadTs?: SortOrderInput | SortOrder;
        chatId?: SortOrderInput | SortOrder;
        messageId?: SortOrderInput | SortOrder;
        _count?: ViewCountOrderByAggregateInput;
        _avg?: ViewAvgOrderByAggregateInput;
        _max?: ViewMaxOrderByAggregateInput;
        _min?: ViewMinOrderByAggregateInput;
        _sum?: ViewSumOrderByAggregateInput;
    };

    export type ViewScalarWhereWithAggregatesInput = {
        AND?: ViewScalarWhereWithAggregatesInput | ViewScalarWhereWithAggregatesInput[];
        OR?: ViewScalarWhereWithAggregatesInput[];
        NOT?: ViewScalarWhereWithAggregatesInput | ViewScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"View"> | string;
        conflictId?: StringWithAggregatesFilter<"View"> | string;
        surface?: EnumSurfaceWithAggregatesFilter<"View"> | $Enums.Surface;
        audience?: EnumAudienceWithAggregatesFilter<"View"> | $Enums.Audience;
        channel?: StringNullableWithAggregatesFilter<"View"> | string | null;
        ts?: StringNullableWithAggregatesFilter<"View"> | string | null;
        threadTs?: StringNullableWithAggregatesFilter<"View"> | string | null;
        chatId?: BigIntNullableWithAggregatesFilter<"View"> | bigint | number | null;
        messageId?: IntNullableWithAggregatesFilter<"View"> | number | null;
    };

    export type DecisionCreateInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
        conflictsAsA?: ConflictCreateNestedManyWithoutDecisionAInput;
        conflictsAsB?: ConflictCreateNestedManyWithoutDecisionBInput;
    };

    export type DecisionUncheckedCreateInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
        conflictsAsA?: ConflictUncheckedCreateNestedManyWithoutDecisionAInput;
        conflictsAsB?: ConflictUncheckedCreateNestedManyWithoutDecisionBInput;
    };

    export type DecisionUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
        conflictsAsA?: ConflictUpdateManyWithoutDecisionANestedInput;
        conflictsAsB?: ConflictUpdateManyWithoutDecisionBNestedInput;
    };

    export type DecisionUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
        conflictsAsA?: ConflictUncheckedUpdateManyWithoutDecisionANestedInput;
        conflictsAsB?: ConflictUncheckedUpdateManyWithoutDecisionBNestedInput;
    };

    export type DecisionCreateManyInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
    };

    export type DecisionUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
    };

    export type DecisionUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
    };

    export type ConflictCreateInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA: DecisionCreateNestedOneWithoutConflictsAsAInput;
        decisionB: DecisionCreateNestedOneWithoutConflictsAsBInput;
        timeline?: EventCreateNestedManyWithoutConflictInput;
        views?: ViewCreateNestedManyWithoutConflictInput;
    };

    export type ConflictUncheckedCreateInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionAId: string;
        decisionBId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedCreateNestedManyWithoutConflictInput;
        views?: ViewUncheckedCreateNestedManyWithoutConflictInput;
    };

    export type ConflictUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA?: DecisionUpdateOneRequiredWithoutConflictsAsANestedInput;
        decisionB?: DecisionUpdateOneRequiredWithoutConflictsAsBNestedInput;
        timeline?: EventUpdateManyWithoutConflictNestedInput;
        views?: ViewUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionAId?: StringFieldUpdateOperationsInput | string;
        decisionBId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedUpdateManyWithoutConflictNestedInput;
        views?: ViewUncheckedUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictCreateManyInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionAId: string;
        decisionBId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type ConflictUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type ConflictUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionAId?: StringFieldUpdateOperationsInput | string;
        decisionBId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type EventCreateInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
        conflict: ConflictCreateNestedOneWithoutTimelineInput;
    };

    export type EventUncheckedCreateInput = {
        id?: string;
        conflictId: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
        conflict?: ConflictUpdateOneRequiredWithoutTimelineNestedInput;
    };

    export type EventUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        conflictId?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventCreateManyInput = {
        id?: string;
        conflictId: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        conflictId?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type ViewCreateInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        threadTs?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
        conflict: ConflictCreateNestedOneWithoutViewsInput;
    };

    export type ViewUncheckedCreateInput = {
        id?: string;
        conflictId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        threadTs?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
        conflict?: ConflictUpdateOneRequiredWithoutViewsNestedInput;
    };

    export type ViewUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        conflictId?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewCreateManyInput = {
        id?: string;
        conflictId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        threadTs?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        conflictId?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type StringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringFilter<$PrismaModel> | string;
    };

    export type DateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
    };

    export type EnumSurfaceFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceFilter<$PrismaModel> | $Enums.Surface;
    };

    export type EnumSubsystemFilter<$PrismaModel = never> = {
        equals?: $Enums.Subsystem | EnumSubsystemFieldRefInput<$PrismaModel>;
        in?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        not?: NestedEnumSubsystemFilter<$PrismaModel> | $Enums.Subsystem;
    };

    export type EnumConditionFilter<$PrismaModel = never> = {
        equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>;
        in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        not?: NestedEnumConditionFilter<$PrismaModel> | $Enums.Condition;
    };

    export type EnumClaimActionFilter<$PrismaModel = never> = {
        equals?: $Enums.ClaimAction | EnumClaimActionFieldRefInput<$PrismaModel>;
        in?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        not?: NestedEnumClaimActionFilter<$PrismaModel> | $Enums.ClaimAction;
    };

    export type StringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringNullableFilter<$PrismaModel> | string | null;
    };

    export type ConflictListRelationFilter = {
        every?: ConflictWhereInput;
        some?: ConflictWhereInput;
        none?: ConflictWhereInput;
    };

    export type SortOrderInput = {
        sort: SortOrder;
        nulls?: NullsOrder;
    };

    export type ConflictOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };

    export type DecisionCountOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        surface?: SortOrder;
        threadKey?: SortOrder;
        threadName?: SortOrder;
        decidedBy?: SortOrder;
        rawText?: SortOrder;
        subsystem?: SortOrder;
        condition?: SortOrder;
        action?: SortOrder;
        supersededById?: SortOrder;
    };

    export type DecisionMaxOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        surface?: SortOrder;
        threadKey?: SortOrder;
        threadName?: SortOrder;
        decidedBy?: SortOrder;
        rawText?: SortOrder;
        subsystem?: SortOrder;
        condition?: SortOrder;
        action?: SortOrder;
        supersededById?: SortOrder;
    };

    export type DecisionMinOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        surface?: SortOrder;
        threadKey?: SortOrder;
        threadName?: SortOrder;
        decidedBy?: SortOrder;
        rawText?: SortOrder;
        subsystem?: SortOrder;
        condition?: SortOrder;
        action?: SortOrder;
        supersededById?: SortOrder;
    };

    export type StringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedStringFilter<$PrismaModel>;
        _max?: NestedStringFilter<$PrismaModel>;
    };

    export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedDateTimeFilter<$PrismaModel>;
        _max?: NestedDateTimeFilter<$PrismaModel>;
    };

    export type EnumSurfaceWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceWithAggregatesFilter<$PrismaModel> | $Enums.Surface;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSurfaceFilter<$PrismaModel>;
        _max?: NestedEnumSurfaceFilter<$PrismaModel>;
    };

    export type EnumSubsystemWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Subsystem | EnumSubsystemFieldRefInput<$PrismaModel>;
        in?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        not?: NestedEnumSubsystemWithAggregatesFilter<$PrismaModel> | $Enums.Subsystem;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSubsystemFilter<$PrismaModel>;
        _max?: NestedEnumSubsystemFilter<$PrismaModel>;
    };

    export type EnumConditionWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>;
        in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        not?: NestedEnumConditionWithAggregatesFilter<$PrismaModel> | $Enums.Condition;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumConditionFilter<$PrismaModel>;
        _max?: NestedEnumConditionFilter<$PrismaModel>;
    };

    export type EnumClaimActionWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.ClaimAction | EnumClaimActionFieldRefInput<$PrismaModel>;
        in?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        not?: NestedEnumClaimActionWithAggregatesFilter<$PrismaModel> | $Enums.ClaimAction;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumClaimActionFilter<$PrismaModel>;
        _max?: NestedEnumClaimActionFilter<$PrismaModel>;
    };

    export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedStringNullableFilter<$PrismaModel>;
        _max?: NestedStringNullableFilter<$PrismaModel>;
    };

    export type IntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntFilter<$PrismaModel> | number;
    };

    export type EnumConflictStatusFilter<$PrismaModel = never> = {
        equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumConflictStatusFilter<$PrismaModel> | $Enums.ConflictStatus;
    };
    export type JsonFilter<$PrismaModel = never> =
        | PatchUndefined<
              Either<
                  Required<JsonFilterBase<$PrismaModel>>,
                  Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, "path">
              >,
              Required<JsonFilterBase<$PrismaModel>>
          >
        | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, "path">>;

    export type JsonFilterBase<$PrismaModel = never> = {
        equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
        path?: string[];
        mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
        string_contains?: string | StringFieldRefInput<$PrismaModel>;
        string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
        string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
        array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    };

    export type DecisionScalarRelationFilter = {
        is?: DecisionWhereInput;
        isNot?: DecisionWhereInput;
    };

    export type EventListRelationFilter = {
        every?: EventWhereInput;
        some?: EventWhereInput;
        none?: EventWhereInput;
    };

    export type ViewListRelationFilter = {
        every?: ViewWhereInput;
        some?: ViewWhereInput;
        none?: ViewWhereInput;
    };

    export type EventOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };

    export type ViewOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };

    export type ConflictDecisionAIdDecisionBIdCompoundUniqueInput = {
        decisionAId: string;
        decisionBId: string;
    };

    export type ConflictCountOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        decisionAId?: SortOrder;
        decisionBId?: SortOrder;
        status?: SortOrder;
        acknowledgedBy?: SortOrder;
        resolution?: SortOrder;
        framings?: SortOrder;
    };

    export type ConflictAvgOrderByAggregateInput = {
        version?: SortOrder;
    };

    export type ConflictMaxOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        decisionAId?: SortOrder;
        decisionBId?: SortOrder;
        status?: SortOrder;
        acknowledgedBy?: SortOrder;
        resolution?: SortOrder;
    };

    export type ConflictMinOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        decisionAId?: SortOrder;
        decisionBId?: SortOrder;
        status?: SortOrder;
        acknowledgedBy?: SortOrder;
        resolution?: SortOrder;
    };

    export type ConflictSumOrderByAggregateInput = {
        version?: SortOrder;
    };

    export type IntWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
        _count?: NestedIntFilter<$PrismaModel>;
        _avg?: NestedFloatFilter<$PrismaModel>;
        _sum?: NestedIntFilter<$PrismaModel>;
        _min?: NestedIntFilter<$PrismaModel>;
        _max?: NestedIntFilter<$PrismaModel>;
    };

    export type EnumConflictStatusWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumConflictStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConflictStatus;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumConflictStatusFilter<$PrismaModel>;
        _max?: NestedEnumConflictStatusFilter<$PrismaModel>;
    };
    export type JsonWithAggregatesFilter<$PrismaModel = never> =
        | PatchUndefined<
              Either<
                  Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
                  Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, "path">
              >,
              Required<JsonWithAggregatesFilterBase<$PrismaModel>>
          >
        | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, "path">>;

    export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
        equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
        path?: string[];
        mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
        string_contains?: string | StringFieldRefInput<$PrismaModel>;
        string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
        string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
        array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedJsonFilter<$PrismaModel>;
        _max?: NestedJsonFilter<$PrismaModel>;
    };

    export type ConflictScalarRelationFilter = {
        is?: ConflictWhereInput;
        isNot?: ConflictWhereInput;
    };

    export type EventCountOrderByAggregateInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
    };

    export type EventMaxOrderByAggregateInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
    };

    export type EventMinOrderByAggregateInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
    };

    export type EnumAudienceFilter<$PrismaModel = never> = {
        equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>;
        in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        not?: NestedEnumAudienceFilter<$PrismaModel> | $Enums.Audience;
    };

    export type BigIntNullableFilter<$PrismaModel = never> = {
        equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null;
        in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null;
    };

    export type IntNullableFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null;
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntNullableFilter<$PrismaModel> | number | null;
    };

    export type ViewCountOrderByAggregateInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrder;
        ts?: SortOrder;
        threadTs?: SortOrder;
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewAvgOrderByAggregateInput = {
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewMaxOrderByAggregateInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrder;
        ts?: SortOrder;
        threadTs?: SortOrder;
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewMinOrderByAggregateInput = {
        id?: SortOrder;
        conflictId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrder;
        ts?: SortOrder;
        threadTs?: SortOrder;
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewSumOrderByAggregateInput = {
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type EnumAudienceWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>;
        in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        not?: NestedEnumAudienceWithAggregatesFilter<$PrismaModel> | $Enums.Audience;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumAudienceFilter<$PrismaModel>;
        _max?: NestedEnumAudienceFilter<$PrismaModel>;
    };

    export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null;
        in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _avg?: NestedFloatNullableFilter<$PrismaModel>;
        _sum?: NestedBigIntNullableFilter<$PrismaModel>;
        _min?: NestedBigIntNullableFilter<$PrismaModel>;
        _max?: NestedBigIntNullableFilter<$PrismaModel>;
    };

    export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null;
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _avg?: NestedFloatNullableFilter<$PrismaModel>;
        _sum?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedIntNullableFilter<$PrismaModel>;
        _max?: NestedIntNullableFilter<$PrismaModel>;
    };

    export type ConflictCreateNestedManyWithoutDecisionAInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionAInput, ConflictUncheckedCreateWithoutDecisionAInput>
            | ConflictCreateWithoutDecisionAInput[]
            | ConflictUncheckedCreateWithoutDecisionAInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionAInput
            | ConflictCreateOrConnectWithoutDecisionAInput[];
        createMany?: ConflictCreateManyDecisionAInputEnvelope;
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
    };

    export type ConflictCreateNestedManyWithoutDecisionBInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionBInput, ConflictUncheckedCreateWithoutDecisionBInput>
            | ConflictCreateWithoutDecisionBInput[]
            | ConflictUncheckedCreateWithoutDecisionBInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionBInput
            | ConflictCreateOrConnectWithoutDecisionBInput[];
        createMany?: ConflictCreateManyDecisionBInputEnvelope;
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
    };

    export type ConflictUncheckedCreateNestedManyWithoutDecisionAInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionAInput, ConflictUncheckedCreateWithoutDecisionAInput>
            | ConflictCreateWithoutDecisionAInput[]
            | ConflictUncheckedCreateWithoutDecisionAInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionAInput
            | ConflictCreateOrConnectWithoutDecisionAInput[];
        createMany?: ConflictCreateManyDecisionAInputEnvelope;
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
    };

    export type ConflictUncheckedCreateNestedManyWithoutDecisionBInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionBInput, ConflictUncheckedCreateWithoutDecisionBInput>
            | ConflictCreateWithoutDecisionBInput[]
            | ConflictUncheckedCreateWithoutDecisionBInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionBInput
            | ConflictCreateOrConnectWithoutDecisionBInput[];
        createMany?: ConflictCreateManyDecisionBInputEnvelope;
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
    };

    export type StringFieldUpdateOperationsInput = {
        set?: string;
    };

    export type DateTimeFieldUpdateOperationsInput = {
        set?: Date | string;
    };

    export type EnumSurfaceFieldUpdateOperationsInput = {
        set?: $Enums.Surface;
    };

    export type EnumSubsystemFieldUpdateOperationsInput = {
        set?: $Enums.Subsystem;
    };

    export type EnumConditionFieldUpdateOperationsInput = {
        set?: $Enums.Condition;
    };

    export type EnumClaimActionFieldUpdateOperationsInput = {
        set?: $Enums.ClaimAction;
    };

    export type NullableStringFieldUpdateOperationsInput = {
        set?: string | null;
    };

    export type ConflictUpdateManyWithoutDecisionANestedInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionAInput, ConflictUncheckedCreateWithoutDecisionAInput>
            | ConflictCreateWithoutDecisionAInput[]
            | ConflictUncheckedCreateWithoutDecisionAInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionAInput
            | ConflictCreateOrConnectWithoutDecisionAInput[];
        upsert?:
            | ConflictUpsertWithWhereUniqueWithoutDecisionAInput
            | ConflictUpsertWithWhereUniqueWithoutDecisionAInput[];
        createMany?: ConflictCreateManyDecisionAInputEnvelope;
        set?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        disconnect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        delete?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        update?:
            | ConflictUpdateWithWhereUniqueWithoutDecisionAInput
            | ConflictUpdateWithWhereUniqueWithoutDecisionAInput[];
        updateMany?:
            | ConflictUpdateManyWithWhereWithoutDecisionAInput
            | ConflictUpdateManyWithWhereWithoutDecisionAInput[];
        deleteMany?: ConflictScalarWhereInput | ConflictScalarWhereInput[];
    };

    export type ConflictUpdateManyWithoutDecisionBNestedInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionBInput, ConflictUncheckedCreateWithoutDecisionBInput>
            | ConflictCreateWithoutDecisionBInput[]
            | ConflictUncheckedCreateWithoutDecisionBInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionBInput
            | ConflictCreateOrConnectWithoutDecisionBInput[];
        upsert?:
            | ConflictUpsertWithWhereUniqueWithoutDecisionBInput
            | ConflictUpsertWithWhereUniqueWithoutDecisionBInput[];
        createMany?: ConflictCreateManyDecisionBInputEnvelope;
        set?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        disconnect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        delete?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        update?:
            | ConflictUpdateWithWhereUniqueWithoutDecisionBInput
            | ConflictUpdateWithWhereUniqueWithoutDecisionBInput[];
        updateMany?:
            | ConflictUpdateManyWithWhereWithoutDecisionBInput
            | ConflictUpdateManyWithWhereWithoutDecisionBInput[];
        deleteMany?: ConflictScalarWhereInput | ConflictScalarWhereInput[];
    };

    export type ConflictUncheckedUpdateManyWithoutDecisionANestedInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionAInput, ConflictUncheckedCreateWithoutDecisionAInput>
            | ConflictCreateWithoutDecisionAInput[]
            | ConflictUncheckedCreateWithoutDecisionAInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionAInput
            | ConflictCreateOrConnectWithoutDecisionAInput[];
        upsert?:
            | ConflictUpsertWithWhereUniqueWithoutDecisionAInput
            | ConflictUpsertWithWhereUniqueWithoutDecisionAInput[];
        createMany?: ConflictCreateManyDecisionAInputEnvelope;
        set?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        disconnect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        delete?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        update?:
            | ConflictUpdateWithWhereUniqueWithoutDecisionAInput
            | ConflictUpdateWithWhereUniqueWithoutDecisionAInput[];
        updateMany?:
            | ConflictUpdateManyWithWhereWithoutDecisionAInput
            | ConflictUpdateManyWithWhereWithoutDecisionAInput[];
        deleteMany?: ConflictScalarWhereInput | ConflictScalarWhereInput[];
    };

    export type ConflictUncheckedUpdateManyWithoutDecisionBNestedInput = {
        create?:
            | XOR<ConflictCreateWithoutDecisionBInput, ConflictUncheckedCreateWithoutDecisionBInput>
            | ConflictCreateWithoutDecisionBInput[]
            | ConflictUncheckedCreateWithoutDecisionBInput[];
        connectOrCreate?:
            | ConflictCreateOrConnectWithoutDecisionBInput
            | ConflictCreateOrConnectWithoutDecisionBInput[];
        upsert?:
            | ConflictUpsertWithWhereUniqueWithoutDecisionBInput
            | ConflictUpsertWithWhereUniqueWithoutDecisionBInput[];
        createMany?: ConflictCreateManyDecisionBInputEnvelope;
        set?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        disconnect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        delete?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        connect?: ConflictWhereUniqueInput | ConflictWhereUniqueInput[];
        update?:
            | ConflictUpdateWithWhereUniqueWithoutDecisionBInput
            | ConflictUpdateWithWhereUniqueWithoutDecisionBInput[];
        updateMany?:
            | ConflictUpdateManyWithWhereWithoutDecisionBInput
            | ConflictUpdateManyWithWhereWithoutDecisionBInput[];
        deleteMany?: ConflictScalarWhereInput | ConflictScalarWhereInput[];
    };

    export type DecisionCreateNestedOneWithoutConflictsAsAInput = {
        create?: XOR<
            DecisionCreateWithoutConflictsAsAInput,
            DecisionUncheckedCreateWithoutConflictsAsAInput
        >;
        connectOrCreate?: DecisionCreateOrConnectWithoutConflictsAsAInput;
        connect?: DecisionWhereUniqueInput;
    };

    export type DecisionCreateNestedOneWithoutConflictsAsBInput = {
        create?: XOR<
            DecisionCreateWithoutConflictsAsBInput,
            DecisionUncheckedCreateWithoutConflictsAsBInput
        >;
        connectOrCreate?: DecisionCreateOrConnectWithoutConflictsAsBInput;
        connect?: DecisionWhereUniqueInput;
    };

    export type EventCreateNestedManyWithoutConflictInput = {
        create?:
            | XOR<EventCreateWithoutConflictInput, EventUncheckedCreateWithoutConflictInput>
            | EventCreateWithoutConflictInput[]
            | EventUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutConflictInput | EventCreateOrConnectWithoutConflictInput[];
        createMany?: EventCreateManyConflictInputEnvelope;
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
    };

    export type ViewCreateNestedManyWithoutConflictInput = {
        create?:
            | XOR<ViewCreateWithoutConflictInput, ViewUncheckedCreateWithoutConflictInput>
            | ViewCreateWithoutConflictInput[]
            | ViewUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutConflictInput | ViewCreateOrConnectWithoutConflictInput[];
        createMany?: ViewCreateManyConflictInputEnvelope;
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
    };

    export type EventUncheckedCreateNestedManyWithoutConflictInput = {
        create?:
            | XOR<EventCreateWithoutConflictInput, EventUncheckedCreateWithoutConflictInput>
            | EventCreateWithoutConflictInput[]
            | EventUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutConflictInput | EventCreateOrConnectWithoutConflictInput[];
        createMany?: EventCreateManyConflictInputEnvelope;
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
    };

    export type ViewUncheckedCreateNestedManyWithoutConflictInput = {
        create?:
            | XOR<ViewCreateWithoutConflictInput, ViewUncheckedCreateWithoutConflictInput>
            | ViewCreateWithoutConflictInput[]
            | ViewUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutConflictInput | ViewCreateOrConnectWithoutConflictInput[];
        createMany?: ViewCreateManyConflictInputEnvelope;
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
    };

    export type IntFieldUpdateOperationsInput = {
        set?: number;
        increment?: number;
        decrement?: number;
        multiply?: number;
        divide?: number;
    };

    export type EnumConflictStatusFieldUpdateOperationsInput = {
        set?: $Enums.ConflictStatus;
    };

    export type DecisionUpdateOneRequiredWithoutConflictsAsANestedInput = {
        create?: XOR<
            DecisionCreateWithoutConflictsAsAInput,
            DecisionUncheckedCreateWithoutConflictsAsAInput
        >;
        connectOrCreate?: DecisionCreateOrConnectWithoutConflictsAsAInput;
        upsert?: DecisionUpsertWithoutConflictsAsAInput;
        connect?: DecisionWhereUniqueInput;
        update?: XOR<
            XOR<
                DecisionUpdateToOneWithWhereWithoutConflictsAsAInput,
                DecisionUpdateWithoutConflictsAsAInput
            >,
            DecisionUncheckedUpdateWithoutConflictsAsAInput
        >;
    };

    export type DecisionUpdateOneRequiredWithoutConflictsAsBNestedInput = {
        create?: XOR<
            DecisionCreateWithoutConflictsAsBInput,
            DecisionUncheckedCreateWithoutConflictsAsBInput
        >;
        connectOrCreate?: DecisionCreateOrConnectWithoutConflictsAsBInput;
        upsert?: DecisionUpsertWithoutConflictsAsBInput;
        connect?: DecisionWhereUniqueInput;
        update?: XOR<
            XOR<
                DecisionUpdateToOneWithWhereWithoutConflictsAsBInput,
                DecisionUpdateWithoutConflictsAsBInput
            >,
            DecisionUncheckedUpdateWithoutConflictsAsBInput
        >;
    };

    export type EventUpdateManyWithoutConflictNestedInput = {
        create?:
            | XOR<EventCreateWithoutConflictInput, EventUncheckedCreateWithoutConflictInput>
            | EventCreateWithoutConflictInput[]
            | EventUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutConflictInput | EventCreateOrConnectWithoutConflictInput[];
        upsert?:
            | EventUpsertWithWhereUniqueWithoutConflictInput
            | EventUpsertWithWhereUniqueWithoutConflictInput[];
        createMany?: EventCreateManyConflictInputEnvelope;
        set?: EventWhereUniqueInput | EventWhereUniqueInput[];
        disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        delete?: EventWhereUniqueInput | EventWhereUniqueInput[];
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        update?:
            | EventUpdateWithWhereUniqueWithoutConflictInput
            | EventUpdateWithWhereUniqueWithoutConflictInput[];
        updateMany?:
            | EventUpdateManyWithWhereWithoutConflictInput
            | EventUpdateManyWithWhereWithoutConflictInput[];
        deleteMany?: EventScalarWhereInput | EventScalarWhereInput[];
    };

    export type ViewUpdateManyWithoutConflictNestedInput = {
        create?:
            | XOR<ViewCreateWithoutConflictInput, ViewUncheckedCreateWithoutConflictInput>
            | ViewCreateWithoutConflictInput[]
            | ViewUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutConflictInput | ViewCreateOrConnectWithoutConflictInput[];
        upsert?:
            | ViewUpsertWithWhereUniqueWithoutConflictInput
            | ViewUpsertWithWhereUniqueWithoutConflictInput[];
        createMany?: ViewCreateManyConflictInputEnvelope;
        set?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        disconnect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        delete?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        update?:
            | ViewUpdateWithWhereUniqueWithoutConflictInput
            | ViewUpdateWithWhereUniqueWithoutConflictInput[];
        updateMany?:
            | ViewUpdateManyWithWhereWithoutConflictInput
            | ViewUpdateManyWithWhereWithoutConflictInput[];
        deleteMany?: ViewScalarWhereInput | ViewScalarWhereInput[];
    };

    export type EventUncheckedUpdateManyWithoutConflictNestedInput = {
        create?:
            | XOR<EventCreateWithoutConflictInput, EventUncheckedCreateWithoutConflictInput>
            | EventCreateWithoutConflictInput[]
            | EventUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutConflictInput | EventCreateOrConnectWithoutConflictInput[];
        upsert?:
            | EventUpsertWithWhereUniqueWithoutConflictInput
            | EventUpsertWithWhereUniqueWithoutConflictInput[];
        createMany?: EventCreateManyConflictInputEnvelope;
        set?: EventWhereUniqueInput | EventWhereUniqueInput[];
        disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        delete?: EventWhereUniqueInput | EventWhereUniqueInput[];
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        update?:
            | EventUpdateWithWhereUniqueWithoutConflictInput
            | EventUpdateWithWhereUniqueWithoutConflictInput[];
        updateMany?:
            | EventUpdateManyWithWhereWithoutConflictInput
            | EventUpdateManyWithWhereWithoutConflictInput[];
        deleteMany?: EventScalarWhereInput | EventScalarWhereInput[];
    };

    export type ViewUncheckedUpdateManyWithoutConflictNestedInput = {
        create?:
            | XOR<ViewCreateWithoutConflictInput, ViewUncheckedCreateWithoutConflictInput>
            | ViewCreateWithoutConflictInput[]
            | ViewUncheckedCreateWithoutConflictInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutConflictInput | ViewCreateOrConnectWithoutConflictInput[];
        upsert?:
            | ViewUpsertWithWhereUniqueWithoutConflictInput
            | ViewUpsertWithWhereUniqueWithoutConflictInput[];
        createMany?: ViewCreateManyConflictInputEnvelope;
        set?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        disconnect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        delete?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        update?:
            | ViewUpdateWithWhereUniqueWithoutConflictInput
            | ViewUpdateWithWhereUniqueWithoutConflictInput[];
        updateMany?:
            | ViewUpdateManyWithWhereWithoutConflictInput
            | ViewUpdateManyWithWhereWithoutConflictInput[];
        deleteMany?: ViewScalarWhereInput | ViewScalarWhereInput[];
    };

    export type ConflictCreateNestedOneWithoutTimelineInput = {
        create?: XOR<
            ConflictCreateWithoutTimelineInput,
            ConflictUncheckedCreateWithoutTimelineInput
        >;
        connectOrCreate?: ConflictCreateOrConnectWithoutTimelineInput;
        connect?: ConflictWhereUniqueInput;
    };

    export type ConflictUpdateOneRequiredWithoutTimelineNestedInput = {
        create?: XOR<
            ConflictCreateWithoutTimelineInput,
            ConflictUncheckedCreateWithoutTimelineInput
        >;
        connectOrCreate?: ConflictCreateOrConnectWithoutTimelineInput;
        upsert?: ConflictUpsertWithoutTimelineInput;
        connect?: ConflictWhereUniqueInput;
        update?: XOR<
            XOR<
                ConflictUpdateToOneWithWhereWithoutTimelineInput,
                ConflictUpdateWithoutTimelineInput
            >,
            ConflictUncheckedUpdateWithoutTimelineInput
        >;
    };

    export type ConflictCreateNestedOneWithoutViewsInput = {
        create?: XOR<ConflictCreateWithoutViewsInput, ConflictUncheckedCreateWithoutViewsInput>;
        connectOrCreate?: ConflictCreateOrConnectWithoutViewsInput;
        connect?: ConflictWhereUniqueInput;
    };

    export type EnumAudienceFieldUpdateOperationsInput = {
        set?: $Enums.Audience;
    };

    export type NullableBigIntFieldUpdateOperationsInput = {
        set?: bigint | number | null;
        increment?: bigint | number;
        decrement?: bigint | number;
        multiply?: bigint | number;
        divide?: bigint | number;
    };

    export type NullableIntFieldUpdateOperationsInput = {
        set?: number | null;
        increment?: number;
        decrement?: number;
        multiply?: number;
        divide?: number;
    };

    export type ConflictUpdateOneRequiredWithoutViewsNestedInput = {
        create?: XOR<ConflictCreateWithoutViewsInput, ConflictUncheckedCreateWithoutViewsInput>;
        connectOrCreate?: ConflictCreateOrConnectWithoutViewsInput;
        upsert?: ConflictUpsertWithoutViewsInput;
        connect?: ConflictWhereUniqueInput;
        update?: XOR<
            XOR<ConflictUpdateToOneWithWhereWithoutViewsInput, ConflictUpdateWithoutViewsInput>,
            ConflictUncheckedUpdateWithoutViewsInput
        >;
    };

    export type NestedStringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringFilter<$PrismaModel> | string;
    };

    export type NestedDateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
    };

    export type NestedEnumSurfaceFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceFilter<$PrismaModel> | $Enums.Surface;
    };

    export type NestedEnumSubsystemFilter<$PrismaModel = never> = {
        equals?: $Enums.Subsystem | EnumSubsystemFieldRefInput<$PrismaModel>;
        in?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        not?: NestedEnumSubsystemFilter<$PrismaModel> | $Enums.Subsystem;
    };

    export type NestedEnumConditionFilter<$PrismaModel = never> = {
        equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>;
        in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        not?: NestedEnumConditionFilter<$PrismaModel> | $Enums.Condition;
    };

    export type NestedEnumClaimActionFilter<$PrismaModel = never> = {
        equals?: $Enums.ClaimAction | EnumClaimActionFieldRefInput<$PrismaModel>;
        in?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        not?: NestedEnumClaimActionFilter<$PrismaModel> | $Enums.ClaimAction;
    };

    export type NestedStringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringNullableFilter<$PrismaModel> | string | null;
    };

    export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedStringFilter<$PrismaModel>;
        _max?: NestedStringFilter<$PrismaModel>;
    };

    export type NestedIntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntFilter<$PrismaModel> | number;
    };

    export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedDateTimeFilter<$PrismaModel>;
        _max?: NestedDateTimeFilter<$PrismaModel>;
    };

    export type NestedEnumSurfaceWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceWithAggregatesFilter<$PrismaModel> | $Enums.Surface;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSurfaceFilter<$PrismaModel>;
        _max?: NestedEnumSurfaceFilter<$PrismaModel>;
    };

    export type NestedEnumSubsystemWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Subsystem | EnumSubsystemFieldRefInput<$PrismaModel>;
        in?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Subsystem[] | ListEnumSubsystemFieldRefInput<$PrismaModel>;
        not?: NestedEnumSubsystemWithAggregatesFilter<$PrismaModel> | $Enums.Subsystem;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSubsystemFilter<$PrismaModel>;
        _max?: NestedEnumSubsystemFilter<$PrismaModel>;
    };

    export type NestedEnumConditionWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Condition | EnumConditionFieldRefInput<$PrismaModel>;
        in?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Condition[] | ListEnumConditionFieldRefInput<$PrismaModel>;
        not?: NestedEnumConditionWithAggregatesFilter<$PrismaModel> | $Enums.Condition;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumConditionFilter<$PrismaModel>;
        _max?: NestedEnumConditionFilter<$PrismaModel>;
    };

    export type NestedEnumClaimActionWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.ClaimAction | EnumClaimActionFieldRefInput<$PrismaModel>;
        in?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ClaimAction[] | ListEnumClaimActionFieldRefInput<$PrismaModel>;
        not?: NestedEnumClaimActionWithAggregatesFilter<$PrismaModel> | $Enums.ClaimAction;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumClaimActionFilter<$PrismaModel>;
        _max?: NestedEnumClaimActionFilter<$PrismaModel>;
    };

    export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedStringNullableFilter<$PrismaModel>;
        _max?: NestedStringNullableFilter<$PrismaModel>;
    };

    export type NestedIntNullableFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null;
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntNullableFilter<$PrismaModel> | number | null;
    };

    export type NestedEnumConflictStatusFilter<$PrismaModel = never> = {
        equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumConflictStatusFilter<$PrismaModel> | $Enums.ConflictStatus;
    };

    export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
        _count?: NestedIntFilter<$PrismaModel>;
        _avg?: NestedFloatFilter<$PrismaModel>;
        _sum?: NestedIntFilter<$PrismaModel>;
        _min?: NestedIntFilter<$PrismaModel>;
        _max?: NestedIntFilter<$PrismaModel>;
    };

    export type NestedFloatFilter<$PrismaModel = never> = {
        equals?: number | FloatFieldRefInput<$PrismaModel>;
        in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
        lt?: number | FloatFieldRefInput<$PrismaModel>;
        lte?: number | FloatFieldRefInput<$PrismaModel>;
        gt?: number | FloatFieldRefInput<$PrismaModel>;
        gte?: number | FloatFieldRefInput<$PrismaModel>;
        not?: NestedFloatFilter<$PrismaModel> | number;
    };

    export type NestedEnumConflictStatusWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.ConflictStatus | EnumConflictStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ConflictStatus[] | ListEnumConflictStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumConflictStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConflictStatus;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumConflictStatusFilter<$PrismaModel>;
        _max?: NestedEnumConflictStatusFilter<$PrismaModel>;
    };
    export type NestedJsonFilter<$PrismaModel = never> =
        | PatchUndefined<
              Either<
                  Required<NestedJsonFilterBase<$PrismaModel>>,
                  Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, "path">
              >,
              Required<NestedJsonFilterBase<$PrismaModel>>
          >
        | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, "path">>;

    export type NestedJsonFilterBase<$PrismaModel = never> = {
        equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
        path?: string[];
        mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
        string_contains?: string | StringFieldRefInput<$PrismaModel>;
        string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
        string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
        array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
        lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
        not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    };

    export type NestedEnumAudienceFilter<$PrismaModel = never> = {
        equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>;
        in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        not?: NestedEnumAudienceFilter<$PrismaModel> | $Enums.Audience;
    };

    export type NestedBigIntNullableFilter<$PrismaModel = never> = {
        equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null;
        in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null;
    };

    export type NestedEnumAudienceWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Audience | EnumAudienceFieldRefInput<$PrismaModel>;
        in?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Audience[] | ListEnumAudienceFieldRefInput<$PrismaModel>;
        not?: NestedEnumAudienceWithAggregatesFilter<$PrismaModel> | $Enums.Audience;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumAudienceFilter<$PrismaModel>;
        _max?: NestedEnumAudienceFilter<$PrismaModel>;
    };

    export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null;
        in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null;
        lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
        not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _avg?: NestedFloatNullableFilter<$PrismaModel>;
        _sum?: NestedBigIntNullableFilter<$PrismaModel>;
        _min?: NestedBigIntNullableFilter<$PrismaModel>;
        _max?: NestedBigIntNullableFilter<$PrismaModel>;
    };

    export type NestedFloatNullableFilter<$PrismaModel = never> = {
        equals?: number | FloatFieldRefInput<$PrismaModel> | null;
        in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
        notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
        lt?: number | FloatFieldRefInput<$PrismaModel>;
        lte?: number | FloatFieldRefInput<$PrismaModel>;
        gt?: number | FloatFieldRefInput<$PrismaModel>;
        gte?: number | FloatFieldRefInput<$PrismaModel>;
        not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
    };

    export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null;
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _avg?: NestedFloatNullableFilter<$PrismaModel>;
        _sum?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedIntNullableFilter<$PrismaModel>;
        _max?: NestedIntNullableFilter<$PrismaModel>;
    };

    export type ConflictCreateWithoutDecisionAInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionB: DecisionCreateNestedOneWithoutConflictsAsBInput;
        timeline?: EventCreateNestedManyWithoutConflictInput;
        views?: ViewCreateNestedManyWithoutConflictInput;
    };

    export type ConflictUncheckedCreateWithoutDecisionAInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionBId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedCreateNestedManyWithoutConflictInput;
        views?: ViewUncheckedCreateNestedManyWithoutConflictInput;
    };

    export type ConflictCreateOrConnectWithoutDecisionAInput = {
        where: ConflictWhereUniqueInput;
        create: XOR<
            ConflictCreateWithoutDecisionAInput,
            ConflictUncheckedCreateWithoutDecisionAInput
        >;
    };

    export type ConflictCreateManyDecisionAInputEnvelope = {
        data: ConflictCreateManyDecisionAInput | ConflictCreateManyDecisionAInput[];
        skipDuplicates?: boolean;
    };

    export type ConflictCreateWithoutDecisionBInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA: DecisionCreateNestedOneWithoutConflictsAsAInput;
        timeline?: EventCreateNestedManyWithoutConflictInput;
        views?: ViewCreateNestedManyWithoutConflictInput;
    };

    export type ConflictUncheckedCreateWithoutDecisionBInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionAId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedCreateNestedManyWithoutConflictInput;
        views?: ViewUncheckedCreateNestedManyWithoutConflictInput;
    };

    export type ConflictCreateOrConnectWithoutDecisionBInput = {
        where: ConflictWhereUniqueInput;
        create: XOR<
            ConflictCreateWithoutDecisionBInput,
            ConflictUncheckedCreateWithoutDecisionBInput
        >;
    };

    export type ConflictCreateManyDecisionBInputEnvelope = {
        data: ConflictCreateManyDecisionBInput | ConflictCreateManyDecisionBInput[];
        skipDuplicates?: boolean;
    };

    export type ConflictUpsertWithWhereUniqueWithoutDecisionAInput = {
        where: ConflictWhereUniqueInput;
        update: XOR<
            ConflictUpdateWithoutDecisionAInput,
            ConflictUncheckedUpdateWithoutDecisionAInput
        >;
        create: XOR<
            ConflictCreateWithoutDecisionAInput,
            ConflictUncheckedCreateWithoutDecisionAInput
        >;
    };

    export type ConflictUpdateWithWhereUniqueWithoutDecisionAInput = {
        where: ConflictWhereUniqueInput;
        data: XOR<
            ConflictUpdateWithoutDecisionAInput,
            ConflictUncheckedUpdateWithoutDecisionAInput
        >;
    };

    export type ConflictUpdateManyWithWhereWithoutDecisionAInput = {
        where: ConflictScalarWhereInput;
        data: XOR<
            ConflictUpdateManyMutationInput,
            ConflictUncheckedUpdateManyWithoutDecisionAInput
        >;
    };

    export type ConflictScalarWhereInput = {
        AND?: ConflictScalarWhereInput | ConflictScalarWhereInput[];
        OR?: ConflictScalarWhereInput[];
        NOT?: ConflictScalarWhereInput | ConflictScalarWhereInput[];
        id?: StringFilter<"Conflict"> | string;
        createdAt?: DateTimeFilter<"Conflict"> | Date | string;
        updatedAt?: DateTimeFilter<"Conflict"> | Date | string;
        version?: IntFilter<"Conflict"> | number;
        decisionAId?: StringFilter<"Conflict"> | string;
        decisionBId?: StringFilter<"Conflict"> | string;
        status?: EnumConflictStatusFilter<"Conflict"> | $Enums.ConflictStatus;
        acknowledgedBy?: StringNullableFilter<"Conflict"> | string | null;
        resolution?: StringNullableFilter<"Conflict"> | string | null;
        framings?: JsonFilter<"Conflict">;
    };

    export type ConflictUpsertWithWhereUniqueWithoutDecisionBInput = {
        where: ConflictWhereUniqueInput;
        update: XOR<
            ConflictUpdateWithoutDecisionBInput,
            ConflictUncheckedUpdateWithoutDecisionBInput
        >;
        create: XOR<
            ConflictCreateWithoutDecisionBInput,
            ConflictUncheckedCreateWithoutDecisionBInput
        >;
    };

    export type ConflictUpdateWithWhereUniqueWithoutDecisionBInput = {
        where: ConflictWhereUniqueInput;
        data: XOR<
            ConflictUpdateWithoutDecisionBInput,
            ConflictUncheckedUpdateWithoutDecisionBInput
        >;
    };

    export type ConflictUpdateManyWithWhereWithoutDecisionBInput = {
        where: ConflictScalarWhereInput;
        data: XOR<
            ConflictUpdateManyMutationInput,
            ConflictUncheckedUpdateManyWithoutDecisionBInput
        >;
    };

    export type DecisionCreateWithoutConflictsAsAInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
        conflictsAsB?: ConflictCreateNestedManyWithoutDecisionBInput;
    };

    export type DecisionUncheckedCreateWithoutConflictsAsAInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
        conflictsAsB?: ConflictUncheckedCreateNestedManyWithoutDecisionBInput;
    };

    export type DecisionCreateOrConnectWithoutConflictsAsAInput = {
        where: DecisionWhereUniqueInput;
        create: XOR<
            DecisionCreateWithoutConflictsAsAInput,
            DecisionUncheckedCreateWithoutConflictsAsAInput
        >;
    };

    export type DecisionCreateWithoutConflictsAsBInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
        conflictsAsA?: ConflictCreateNestedManyWithoutDecisionAInput;
    };

    export type DecisionUncheckedCreateWithoutConflictsAsBInput = {
        id?: string;
        createdAt?: Date | string;
        surface: $Enums.Surface;
        threadKey: string;
        threadName: string;
        decidedBy: string;
        rawText: string;
        subsystem: $Enums.Subsystem;
        condition: $Enums.Condition;
        action: $Enums.ClaimAction;
        supersededById?: string | null;
        conflictsAsA?: ConflictUncheckedCreateNestedManyWithoutDecisionAInput;
    };

    export type DecisionCreateOrConnectWithoutConflictsAsBInput = {
        where: DecisionWhereUniqueInput;
        create: XOR<
            DecisionCreateWithoutConflictsAsBInput,
            DecisionUncheckedCreateWithoutConflictsAsBInput
        >;
    };

    export type EventCreateWithoutConflictInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventUncheckedCreateWithoutConflictInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventCreateOrConnectWithoutConflictInput = {
        where: EventWhereUniqueInput;
        create: XOR<EventCreateWithoutConflictInput, EventUncheckedCreateWithoutConflictInput>;
    };

    export type EventCreateManyConflictInputEnvelope = {
        data: EventCreateManyConflictInput | EventCreateManyConflictInput[];
        skipDuplicates?: boolean;
    };

    export type ViewCreateWithoutConflictInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        threadTs?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewUncheckedCreateWithoutConflictInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        threadTs?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewCreateOrConnectWithoutConflictInput = {
        where: ViewWhereUniqueInput;
        create: XOR<ViewCreateWithoutConflictInput, ViewUncheckedCreateWithoutConflictInput>;
    };

    export type ViewCreateManyConflictInputEnvelope = {
        data: ViewCreateManyConflictInput | ViewCreateManyConflictInput[];
        skipDuplicates?: boolean;
    };

    export type DecisionUpsertWithoutConflictsAsAInput = {
        update: XOR<
            DecisionUpdateWithoutConflictsAsAInput,
            DecisionUncheckedUpdateWithoutConflictsAsAInput
        >;
        create: XOR<
            DecisionCreateWithoutConflictsAsAInput,
            DecisionUncheckedCreateWithoutConflictsAsAInput
        >;
        where?: DecisionWhereInput;
    };

    export type DecisionUpdateToOneWithWhereWithoutConflictsAsAInput = {
        where?: DecisionWhereInput;
        data: XOR<
            DecisionUpdateWithoutConflictsAsAInput,
            DecisionUncheckedUpdateWithoutConflictsAsAInput
        >;
    };

    export type DecisionUpdateWithoutConflictsAsAInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
        conflictsAsB?: ConflictUpdateManyWithoutDecisionBNestedInput;
    };

    export type DecisionUncheckedUpdateWithoutConflictsAsAInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
        conflictsAsB?: ConflictUncheckedUpdateManyWithoutDecisionBNestedInput;
    };

    export type DecisionUpsertWithoutConflictsAsBInput = {
        update: XOR<
            DecisionUpdateWithoutConflictsAsBInput,
            DecisionUncheckedUpdateWithoutConflictsAsBInput
        >;
        create: XOR<
            DecisionCreateWithoutConflictsAsBInput,
            DecisionUncheckedCreateWithoutConflictsAsBInput
        >;
        where?: DecisionWhereInput;
    };

    export type DecisionUpdateToOneWithWhereWithoutConflictsAsBInput = {
        where?: DecisionWhereInput;
        data: XOR<
            DecisionUpdateWithoutConflictsAsBInput,
            DecisionUncheckedUpdateWithoutConflictsAsBInput
        >;
    };

    export type DecisionUpdateWithoutConflictsAsBInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
        conflictsAsA?: ConflictUpdateManyWithoutDecisionANestedInput;
    };

    export type DecisionUncheckedUpdateWithoutConflictsAsBInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        threadKey?: StringFieldUpdateOperationsInput | string;
        threadName?: StringFieldUpdateOperationsInput | string;
        decidedBy?: StringFieldUpdateOperationsInput | string;
        rawText?: StringFieldUpdateOperationsInput | string;
        subsystem?: EnumSubsystemFieldUpdateOperationsInput | $Enums.Subsystem;
        condition?: EnumConditionFieldUpdateOperationsInput | $Enums.Condition;
        action?: EnumClaimActionFieldUpdateOperationsInput | $Enums.ClaimAction;
        supersededById?: NullableStringFieldUpdateOperationsInput | string | null;
        conflictsAsA?: ConflictUncheckedUpdateManyWithoutDecisionANestedInput;
    };

    export type EventUpsertWithWhereUniqueWithoutConflictInput = {
        where: EventWhereUniqueInput;
        update: XOR<EventUpdateWithoutConflictInput, EventUncheckedUpdateWithoutConflictInput>;
        create: XOR<EventCreateWithoutConflictInput, EventUncheckedCreateWithoutConflictInput>;
    };

    export type EventUpdateWithWhereUniqueWithoutConflictInput = {
        where: EventWhereUniqueInput;
        data: XOR<EventUpdateWithoutConflictInput, EventUncheckedUpdateWithoutConflictInput>;
    };

    export type EventUpdateManyWithWhereWithoutConflictInput = {
        where: EventScalarWhereInput;
        data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutConflictInput>;
    };

    export type EventScalarWhereInput = {
        AND?: EventScalarWhereInput | EventScalarWhereInput[];
        OR?: EventScalarWhereInput[];
        NOT?: EventScalarWhereInput | EventScalarWhereInput[];
        id?: StringFilter<"Event"> | string;
        conflictId?: StringFilter<"Event"> | string;
        at?: DateTimeFilter<"Event"> | Date | string;
        by?: StringFilter<"Event"> | string;
        what?: StringFilter<"Event"> | string;
    };

    export type ViewUpsertWithWhereUniqueWithoutConflictInput = {
        where: ViewWhereUniqueInput;
        update: XOR<ViewUpdateWithoutConflictInput, ViewUncheckedUpdateWithoutConflictInput>;
        create: XOR<ViewCreateWithoutConflictInput, ViewUncheckedCreateWithoutConflictInput>;
    };

    export type ViewUpdateWithWhereUniqueWithoutConflictInput = {
        where: ViewWhereUniqueInput;
        data: XOR<ViewUpdateWithoutConflictInput, ViewUncheckedUpdateWithoutConflictInput>;
    };

    export type ViewUpdateManyWithWhereWithoutConflictInput = {
        where: ViewScalarWhereInput;
        data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyWithoutConflictInput>;
    };

    export type ViewScalarWhereInput = {
        AND?: ViewScalarWhereInput | ViewScalarWhereInput[];
        OR?: ViewScalarWhereInput[];
        NOT?: ViewScalarWhereInput | ViewScalarWhereInput[];
        id?: StringFilter<"View"> | string;
        conflictId?: StringFilter<"View"> | string;
        surface?: EnumSurfaceFilter<"View"> | $Enums.Surface;
        audience?: EnumAudienceFilter<"View"> | $Enums.Audience;
        channel?: StringNullableFilter<"View"> | string | null;
        ts?: StringNullableFilter<"View"> | string | null;
        threadTs?: StringNullableFilter<"View"> | string | null;
        chatId?: BigIntNullableFilter<"View"> | bigint | number | null;
        messageId?: IntNullableFilter<"View"> | number | null;
    };

    export type ConflictCreateWithoutTimelineInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA: DecisionCreateNestedOneWithoutConflictsAsAInput;
        decisionB: DecisionCreateNestedOneWithoutConflictsAsBInput;
        views?: ViewCreateNestedManyWithoutConflictInput;
    };

    export type ConflictUncheckedCreateWithoutTimelineInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionAId: string;
        decisionBId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        views?: ViewUncheckedCreateNestedManyWithoutConflictInput;
    };

    export type ConflictCreateOrConnectWithoutTimelineInput = {
        where: ConflictWhereUniqueInput;
        create: XOR<
            ConflictCreateWithoutTimelineInput,
            ConflictUncheckedCreateWithoutTimelineInput
        >;
    };

    export type ConflictUpsertWithoutTimelineInput = {
        update: XOR<
            ConflictUpdateWithoutTimelineInput,
            ConflictUncheckedUpdateWithoutTimelineInput
        >;
        create: XOR<
            ConflictCreateWithoutTimelineInput,
            ConflictUncheckedCreateWithoutTimelineInput
        >;
        where?: ConflictWhereInput;
    };

    export type ConflictUpdateToOneWithWhereWithoutTimelineInput = {
        where?: ConflictWhereInput;
        data: XOR<ConflictUpdateWithoutTimelineInput, ConflictUncheckedUpdateWithoutTimelineInput>;
    };

    export type ConflictUpdateWithoutTimelineInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA?: DecisionUpdateOneRequiredWithoutConflictsAsANestedInput;
        decisionB?: DecisionUpdateOneRequiredWithoutConflictsAsBNestedInput;
        views?: ViewUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateWithoutTimelineInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionAId?: StringFieldUpdateOperationsInput | string;
        decisionBId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        views?: ViewUncheckedUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictCreateWithoutViewsInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA: DecisionCreateNestedOneWithoutConflictsAsAInput;
        decisionB: DecisionCreateNestedOneWithoutConflictsAsBInput;
        timeline?: EventCreateNestedManyWithoutConflictInput;
    };

    export type ConflictUncheckedCreateWithoutViewsInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionAId: string;
        decisionBId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedCreateNestedManyWithoutConflictInput;
    };

    export type ConflictCreateOrConnectWithoutViewsInput = {
        where: ConflictWhereUniqueInput;
        create: XOR<ConflictCreateWithoutViewsInput, ConflictUncheckedCreateWithoutViewsInput>;
    };

    export type ConflictUpsertWithoutViewsInput = {
        update: XOR<ConflictUpdateWithoutViewsInput, ConflictUncheckedUpdateWithoutViewsInput>;
        create: XOR<ConflictCreateWithoutViewsInput, ConflictUncheckedCreateWithoutViewsInput>;
        where?: ConflictWhereInput;
    };

    export type ConflictUpdateToOneWithWhereWithoutViewsInput = {
        where?: ConflictWhereInput;
        data: XOR<ConflictUpdateWithoutViewsInput, ConflictUncheckedUpdateWithoutViewsInput>;
    };

    export type ConflictUpdateWithoutViewsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA?: DecisionUpdateOneRequiredWithoutConflictsAsANestedInput;
        decisionB?: DecisionUpdateOneRequiredWithoutConflictsAsBNestedInput;
        timeline?: EventUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateWithoutViewsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionAId?: StringFieldUpdateOperationsInput | string;
        decisionBId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictCreateManyDecisionAInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionBId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type ConflictCreateManyDecisionBInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        decisionAId: string;
        status?: $Enums.ConflictStatus;
        acknowledgedBy?: string | null;
        resolution?: string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type ConflictUpdateWithoutDecisionAInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionB?: DecisionUpdateOneRequiredWithoutConflictsAsBNestedInput;
        timeline?: EventUpdateManyWithoutConflictNestedInput;
        views?: ViewUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateWithoutDecisionAInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionBId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedUpdateManyWithoutConflictNestedInput;
        views?: ViewUncheckedUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateManyWithoutDecisionAInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionBId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type ConflictUpdateWithoutDecisionBInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        decisionA?: DecisionUpdateOneRequiredWithoutConflictsAsANestedInput;
        timeline?: EventUpdateManyWithoutConflictNestedInput;
        views?: ViewUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateWithoutDecisionBInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionAId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedUpdateManyWithoutConflictNestedInput;
        views?: ViewUncheckedUpdateManyWithoutConflictNestedInput;
    };

    export type ConflictUncheckedUpdateManyWithoutDecisionBInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        decisionAId?: StringFieldUpdateOperationsInput | string;
        status?: EnumConflictStatusFieldUpdateOperationsInput | $Enums.ConflictStatus;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        resolution?: NullableStringFieldUpdateOperationsInput | string | null;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type EventCreateManyConflictInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type ViewCreateManyConflictInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        threadTs?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type EventUpdateWithoutConflictInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventUncheckedUpdateWithoutConflictInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventUncheckedUpdateManyWithoutConflictInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type ViewUpdateWithoutConflictInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewUncheckedUpdateWithoutConflictInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewUncheckedUpdateManyWithoutConflictInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        threadTs?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    /**
     * Batch Payload for updateMany & deleteMany & createMany
     */

    export type BatchPayload = {
        count: number;
    };

    /**
     * DMMF
     */
    export const dmmf: runtime.BaseDMMF;
}
