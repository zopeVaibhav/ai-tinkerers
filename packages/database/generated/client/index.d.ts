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
 * Model Issue
 * One shared object. Every surface renders this and nothing else.
 */
export type Issue = $Result.DefaultSelection<Prisma.$IssuePayload>;
/**
 * Model Event
 * Append-only. One row per applied action.
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>;
/**
 * Model View
 * A live window onto one issue. Web connections are not persisted; they die
 * with the browser tab. Only message-backed views survive a restart.
 */
export type View = $Result.DefaultSelection<Prisma.$ViewPayload>;

/**
 * Enums
 */
export namespace $Enums {
    export const Severity: {
        low: "low";
        medium: "medium";
        high: "high";
    };

    export type Severity = (typeof Severity)[keyof typeof Severity];

    export const Status: {
        triage: "triage";
        awaiting_approval: "awaiting_approval";
        approved: "approved";
        resolved: "resolved";
    };

    export type Status = (typeof Status)[keyof typeof Status];

    export const Surface: {
        slack: "slack";
        telegram: "telegram";
        web: "web";
    };

    export type Surface = (typeof Surface)[keyof typeof Surface];

    export const Audience: {
        engineer: "engineer";
        lead: "lead";
        customer: "customer";
    };

    export type Audience = (typeof Audience)[keyof typeof Audience];
}

export type Severity = $Enums.Severity;

export const Severity: typeof $Enums.Severity;

export type Status = $Enums.Status;

export const Status: typeof $Enums.Status;

export type Surface = $Enums.Surface;

export const Surface: typeof $Enums.Surface;

export type Audience = $Enums.Audience;

export const Audience: typeof $Enums.Audience;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Issues
 * const issues = await prisma.issue.findMany()
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
     * // Fetch zero or more Issues
     * const issues = await prisma.issue.findMany()
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
     * `prisma.issue`: Exposes CRUD operations for the **Issue** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Issues
     * const issues = await prisma.issue.findMany()
     * ```
     */
    get issue(): Prisma.IssueDelegate<ExtArgs, ClientOptions>;

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
        Issue: "Issue";
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
            modelProps: "issue" | "event" | "view";
            txIsolationLevel: Prisma.TransactionIsolationLevel;
        };
        model: {
            Issue: {
                payload: Prisma.$IssuePayload<ExtArgs>;
                fields: Prisma.IssueFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.IssueFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.IssueFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>;
                    };
                    findFirst: {
                        args: Prisma.IssueFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.IssueFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>;
                    };
                    findMany: {
                        args: Prisma.IssueFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>[];
                    };
                    create: {
                        args: Prisma.IssueCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>;
                    };
                    createMany: {
                        args: Prisma.IssueCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.IssueCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>[];
                    };
                    delete: {
                        args: Prisma.IssueDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>;
                    };
                    update: {
                        args: Prisma.IssueUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>;
                    };
                    deleteMany: {
                        args: Prisma.IssueDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.IssueUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.IssueUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>[];
                    };
                    upsert: {
                        args: Prisma.IssueUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$IssuePayload>;
                    };
                    aggregate: {
                        args: Prisma.IssueAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateIssue>;
                    };
                    groupBy: {
                        args: Prisma.IssueGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<IssueGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.IssueCountArgs<ExtArgs>;
                        result: $Utils.Optional<IssueCountAggregateOutputType> | number;
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
        issue?: IssueOmit;
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
     * Count Type IssueCountOutputType
     */

    export type IssueCountOutputType = {
        timeline: number;
        views: number;
    };

    export type IssueCountOutputTypeSelect<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        timeline?: boolean | IssueCountOutputTypeCountTimelineArgs;
        views?: boolean | IssueCountOutputTypeCountViewsArgs;
    };

    // Custom InputTypes
    /**
     * IssueCountOutputType without action
     */
    export type IssueCountOutputTypeDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the IssueCountOutputType
         */
        select?: IssueCountOutputTypeSelect<ExtArgs> | null;
    };

    /**
     * IssueCountOutputType without action
     */
    export type IssueCountOutputTypeCountTimelineArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: EventWhereInput;
    };

    /**
     * IssueCountOutputType without action
     */
    export type IssueCountOutputTypeCountViewsArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: ViewWhereInput;
    };

    /**
     * Models
     */

    /**
     * Model Issue
     */

    export type AggregateIssue = {
        _count: IssueCountAggregateOutputType | null;
        _avg: IssueAvgAggregateOutputType | null;
        _sum: IssueSumAggregateOutputType | null;
        _min: IssueMinAggregateOutputType | null;
        _max: IssueMaxAggregateOutputType | null;
    };

    export type IssueAvgAggregateOutputType = {
        version: number | null;
        affected: number | null;
    };

    export type IssueSumAggregateOutputType = {
        version: number | null;
        affected: number | null;
    };

    export type IssueMinAggregateOutputType = {
        id: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        raisedBy: string | null;
        raisedOn: $Enums.Surface | null;
        what: string | null;
        severity: $Enums.Severity | null;
        affected: number | null;
        acknowledgedBy: string | null;
        proposedFix: string | null;
        approvedBy: string | null;
        status: $Enums.Status | null;
    };

    export type IssueMaxAggregateOutputType = {
        id: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        raisedBy: string | null;
        raisedOn: $Enums.Surface | null;
        what: string | null;
        severity: $Enums.Severity | null;
        affected: number | null;
        acknowledgedBy: string | null;
        proposedFix: string | null;
        approvedBy: string | null;
        status: $Enums.Status | null;
    };

    export type IssueCountAggregateOutputType = {
        id: number;
        createdAt: number;
        updatedAt: number;
        version: number;
        raisedBy: number;
        raisedOn: number;
        what: number;
        severity: number;
        affected: number;
        acknowledgedBy: number;
        proposedFix: number;
        approvedBy: number;
        status: number;
        framings: number;
        _all: number;
    };

    export type IssueAvgAggregateInputType = {
        version?: true;
        affected?: true;
    };

    export type IssueSumAggregateInputType = {
        version?: true;
        affected?: true;
    };

    export type IssueMinAggregateInputType = {
        id?: true;
        createdAt?: true;
        updatedAt?: true;
        version?: true;
        raisedBy?: true;
        raisedOn?: true;
        what?: true;
        severity?: true;
        affected?: true;
        acknowledgedBy?: true;
        proposedFix?: true;
        approvedBy?: true;
        status?: true;
    };

    export type IssueMaxAggregateInputType = {
        id?: true;
        createdAt?: true;
        updatedAt?: true;
        version?: true;
        raisedBy?: true;
        raisedOn?: true;
        what?: true;
        severity?: true;
        affected?: true;
        acknowledgedBy?: true;
        proposedFix?: true;
        approvedBy?: true;
        status?: true;
    };

    export type IssueCountAggregateInputType = {
        id?: true;
        createdAt?: true;
        updatedAt?: true;
        version?: true;
        raisedBy?: true;
        raisedOn?: true;
        what?: true;
        severity?: true;
        affected?: true;
        acknowledgedBy?: true;
        proposedFix?: true;
        approvedBy?: true;
        status?: true;
        framings?: true;
        _all?: true;
    };

    export type IssueAggregateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Issue to aggregate.
         */
        where?: IssueWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Issues to fetch.
         */
        orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: IssueWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Issues from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Issues.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned Issues
         **/
        _count?: true | IssueCountAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to average
         **/
        _avg?: IssueAvgAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to sum
         **/
        _sum?: IssueSumAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: IssueMinAggregateInputType;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: IssueMaxAggregateInputType;
    };

    export type GetIssueAggregateType<T extends IssueAggregateArgs> = {
        [P in keyof T & keyof AggregateIssue]: P extends "_count" | "count"
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateIssue[P]>
            : GetScalarType<T[P], AggregateIssue[P]>;
    };

    export type IssueGroupByArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        where?: IssueWhereInput;
        orderBy?: IssueOrderByWithAggregationInput | IssueOrderByWithAggregationInput[];
        by: IssueScalarFieldEnum[] | IssueScalarFieldEnum;
        having?: IssueScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: IssueCountAggregateInputType | true;
        _avg?: IssueAvgAggregateInputType;
        _sum?: IssueSumAggregateInputType;
        _min?: IssueMinAggregateInputType;
        _max?: IssueMaxAggregateInputType;
    };

    export type IssueGroupByOutputType = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity: $Enums.Severity;
        affected: number;
        acknowledgedBy: string | null;
        proposedFix: string | null;
        approvedBy: string | null;
        status: $Enums.Status;
        framings: JsonValue;
        _count: IssueCountAggregateOutputType | null;
        _avg: IssueAvgAggregateOutputType | null;
        _sum: IssueSumAggregateOutputType | null;
        _min: IssueMinAggregateOutputType | null;
        _max: IssueMaxAggregateOutputType | null;
    };

    type GetIssueGroupByPayload<T extends IssueGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<IssueGroupByOutputType, T["by"]> & {
                [P in keyof T & keyof IssueGroupByOutputType]: P extends "_count"
                    ? T[P] extends boolean
                        ? number
                        : GetScalarType<T[P], IssueGroupByOutputType[P]>
                    : GetScalarType<T[P], IssueGroupByOutputType[P]>;
            }
        >
    >;

    export type IssueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetSelect<
            {
                id?: boolean;
                createdAt?: boolean;
                updatedAt?: boolean;
                version?: boolean;
                raisedBy?: boolean;
                raisedOn?: boolean;
                what?: boolean;
                severity?: boolean;
                affected?: boolean;
                acknowledgedBy?: boolean;
                proposedFix?: boolean;
                approvedBy?: boolean;
                status?: boolean;
                framings?: boolean;
                timeline?: boolean | Issue$timelineArgs<ExtArgs>;
                views?: boolean | Issue$viewsArgs<ExtArgs>;
                _count?: boolean | IssueCountOutputTypeDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["issue"]
        >;

    export type IssueSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            createdAt?: boolean;
            updatedAt?: boolean;
            version?: boolean;
            raisedBy?: boolean;
            raisedOn?: boolean;
            what?: boolean;
            severity?: boolean;
            affected?: boolean;
            acknowledgedBy?: boolean;
            proposedFix?: boolean;
            approvedBy?: boolean;
            status?: boolean;
            framings?: boolean;
        },
        ExtArgs["result"]["issue"]
    >;

    export type IssueSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            createdAt?: boolean;
            updatedAt?: boolean;
            version?: boolean;
            raisedBy?: boolean;
            raisedOn?: boolean;
            what?: boolean;
            severity?: boolean;
            affected?: boolean;
            acknowledgedBy?: boolean;
            proposedFix?: boolean;
            approvedBy?: boolean;
            status?: boolean;
            framings?: boolean;
        },
        ExtArgs["result"]["issue"]
    >;

    export type IssueSelectScalar = {
        id?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        version?: boolean;
        raisedBy?: boolean;
        raisedOn?: boolean;
        what?: boolean;
        severity?: boolean;
        affected?: boolean;
        acknowledgedBy?: boolean;
        proposedFix?: boolean;
        approvedBy?: boolean;
        status?: boolean;
        framings?: boolean;
    };

    export type IssueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<
            | "id"
            | "createdAt"
            | "updatedAt"
            | "version"
            | "raisedBy"
            | "raisedOn"
            | "what"
            | "severity"
            | "affected"
            | "acknowledgedBy"
            | "proposedFix"
            | "approvedBy"
            | "status"
            | "framings",
            ExtArgs["result"]["issue"]
        >;
    export type IssueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        timeline?: boolean | Issue$timelineArgs<ExtArgs>;
        views?: boolean | Issue$viewsArgs<ExtArgs>;
        _count?: boolean | IssueCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type IssueIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {};
    export type IssueIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {};

    export type $IssuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            name: "Issue";
            objects: {
                timeline: Prisma.$EventPayload<ExtArgs>[];
                views: Prisma.$ViewPayload<ExtArgs>[];
            };
            scalars: $Extensions.GetPayloadResult<
                {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    version: number;
                    raisedBy: string;
                    raisedOn: $Enums.Surface;
                    what: string;
                    severity: $Enums.Severity;
                    affected: number;
                    acknowledgedBy: string | null;
                    proposedFix: string | null;
                    approvedBy: string | null;
                    status: $Enums.Status;
                    /**
                     * The agent's wording of the same facts, keyed by audience.
                     */
                    framings: Prisma.JsonValue;
                },
                ExtArgs["result"]["issue"]
            >;
            composites: {};
        };

    type IssueGetPayload<S extends boolean | null | undefined | IssueDefaultArgs> =
        $Result.GetResult<Prisma.$IssuePayload, S>;

    type IssueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
        IssueFindManyArgs,
        "select" | "include" | "distinct" | "omit"
    > & {
        select?: IssueCountAggregateInputType | true;
    };

    export interface IssueDelegate<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > {
        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["Issue"]; meta: { name: "Issue" } };
        /**
         * Find zero or one Issue that matches the filter.
         * @param {IssueFindUniqueArgs} args - Arguments to find a Issue
         * @example
         * // Get one Issue
         * const issue = await prisma.issue.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends IssueFindUniqueArgs>(
            args: SelectSubset<T, IssueFindUniqueArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<
                Prisma.$IssuePayload<ExtArgs>,
                T,
                "findUnique",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find one Issue that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {IssueFindUniqueOrThrowArgs} args - Arguments to find a Issue
         * @example
         * // Get one Issue
         * const issue = await prisma.issue.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends IssueFindUniqueOrThrowArgs>(
            args: SelectSubset<T, IssueFindUniqueOrThrowArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<
                Prisma.$IssuePayload<ExtArgs>,
                T,
                "findUniqueOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Issue that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueFindFirstArgs} args - Arguments to find a Issue
         * @example
         * // Get one Issue
         * const issue = await prisma.issue.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends IssueFindFirstArgs>(
            args?: SelectSubset<T, IssueFindFirstArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<
                Prisma.$IssuePayload<ExtArgs>,
                T,
                "findFirst",
                GlobalOmitOptions
            > | null,
            null,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find the first Issue that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueFindFirstOrThrowArgs} args - Arguments to find a Issue
         * @example
         * // Get one Issue
         * const issue = await prisma.issue.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends IssueFindFirstOrThrowArgs>(
            args?: SelectSubset<T, IssueFindFirstOrThrowArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<
                Prisma.$IssuePayload<ExtArgs>,
                T,
                "findFirstOrThrow",
                GlobalOmitOptions
            >,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Find zero or more Issues that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Issues
         * const issues = await prisma.issue.findMany()
         *
         * // Get first 10 Issues
         * const issues = await prisma.issue.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const issueWithIdOnly = await prisma.issue.findMany({ select: { id: true } })
         *
         */
        findMany<T extends IssueFindManyArgs>(
            args?: SelectSubset<T, IssueFindManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
        >;

        /**
         * Create a Issue.
         * @param {IssueCreateArgs} args - Arguments to create a Issue.
         * @example
         * // Create one Issue
         * const Issue = await prisma.issue.create({
         *   data: {
         *     // ... data to create a Issue
         *   }
         * })
         *
         */
        create<T extends IssueCreateArgs>(
            args: SelectSubset<T, IssueCreateArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "create", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Create many Issues.
         * @param {IssueCreateManyArgs} args - Arguments to create many Issues.
         * @example
         * // Create many Issues
         * const issue = await prisma.issue.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends IssueCreateManyArgs>(
            args?: SelectSubset<T, IssueCreateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Create many Issues and returns the data saved in the database.
         * @param {IssueCreateManyAndReturnArgs} args - Arguments to create many Issues.
         * @example
         * // Create many Issues
         * const issue = await prisma.issue.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Issues and only return the `id`
         * const issueWithIdOnly = await prisma.issue.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends IssueCreateManyAndReturnArgs>(
            args?: SelectSubset<T, IssueCreateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$IssuePayload<ExtArgs>,
                T,
                "createManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Delete a Issue.
         * @param {IssueDeleteArgs} args - Arguments to delete one Issue.
         * @example
         * // Delete one Issue
         * const Issue = await prisma.issue.delete({
         *   where: {
         *     // ... filter to delete one Issue
         *   }
         * })
         *
         */
        delete<T extends IssueDeleteArgs>(
            args: SelectSubset<T, IssueDeleteArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Update one Issue.
         * @param {IssueUpdateArgs} args - Arguments to update one Issue.
         * @example
         * // Update one Issue
         * const issue = await prisma.issue.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends IssueUpdateArgs>(
            args: SelectSubset<T, IssueUpdateArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "update", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Delete zero or more Issues.
         * @param {IssueDeleteManyArgs} args - Arguments to filter Issues to delete.
         * @example
         * // Delete a few Issues
         * const { count } = await prisma.issue.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends IssueDeleteManyArgs>(
            args?: SelectSubset<T, IssueDeleteManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Issues.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Issues
         * const issue = await prisma.issue.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends IssueUpdateManyArgs>(
            args: SelectSubset<T, IssueUpdateManyArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<BatchPayload>;

        /**
         * Update zero or more Issues and returns the data updated in the database.
         * @param {IssueUpdateManyAndReturnArgs} args - Arguments to update many Issues.
         * @example
         * // Update many Issues
         * const issue = await prisma.issue.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Issues and only return the `id`
         * const issueWithIdOnly = await prisma.issue.updateManyAndReturn({
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
        updateManyAndReturn<T extends IssueUpdateManyAndReturnArgs>(
            args: SelectSubset<T, IssueUpdateManyAndReturnArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            $Result.GetResult<
                Prisma.$IssuePayload<ExtArgs>,
                T,
                "updateManyAndReturn",
                GlobalOmitOptions
            >
        >;

        /**
         * Create or update one Issue.
         * @param {IssueUpsertArgs} args - Arguments to update or create a Issue.
         * @example
         * // Update or create a Issue
         * const issue = await prisma.issue.upsert({
         *   create: {
         *     // ... data to create a Issue
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the Issue we want to update
         *   }
         * })
         */
        upsert<T extends IssueUpsertArgs>(
            args: SelectSubset<T, IssueUpsertArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            $Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>,
            never,
            ExtArgs,
            GlobalOmitOptions
        >;

        /**
         * Count the number of Issues.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueCountArgs} args - Arguments to filter Issues to count.
         * @example
         * // Count the number of Issues
         * const count = await prisma.issue.count({
         *   where: {
         *     // ... the filter for the Issues we want to count
         *   }
         * })
         **/
        count<T extends IssueCountArgs>(
            args?: Subset<T, IssueCountArgs>,
        ): Prisma.PrismaPromise<
            T extends $Utils.Record<"select", any>
                ? T["select"] extends true
                    ? number
                    : GetScalarType<T["select"], IssueCountAggregateOutputType>
                : number
        >;

        /**
         * Allows you to perform aggregations operations on a Issue.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
        aggregate<T extends IssueAggregateArgs>(
            args: Subset<T, IssueAggregateArgs>,
        ): Prisma.PrismaPromise<GetIssueAggregateType<T>>;

        /**
         * Group by Issue.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {IssueGroupByArgs} args - Group by arguments.
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
            T extends IssueGroupByArgs,
            HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
            OrderByArg extends (True extends HasSelectOrTake
                ? { orderBy: IssueGroupByArgs["orderBy"] }
                : { orderBy?: IssueGroupByArgs["orderBy"] }),
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
            args: SubsetIntersection<T, IssueGroupByArgs, OrderByArg> & InputErrors,
        ): {} extends InputErrors ? GetIssueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        /**
         * Fields of the Issue model
         */
        readonly fields: IssueFieldRefs;
    }

    /**
     * The delegate class that acts as a "Promise-like" for Issue.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__IssueClient<
        T,
        Null = never,
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
        GlobalOmitOptions = {},
    > extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        timeline<T extends Issue$timelineArgs<ExtArgs> = {}>(
            args?: Subset<T, Issue$timelineArgs<ExtArgs>>,
        ): Prisma.PrismaPromise<
            | $Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>
            | Null
        >;
        views<T extends Issue$viewsArgs<ExtArgs> = {}>(
            args?: Subset<T, Issue$viewsArgs<ExtArgs>>,
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
     * Fields of the Issue model
     */
    interface IssueFieldRefs {
        readonly id: FieldRef<"Issue", "String">;
        readonly createdAt: FieldRef<"Issue", "DateTime">;
        readonly updatedAt: FieldRef<"Issue", "DateTime">;
        readonly version: FieldRef<"Issue", "Int">;
        readonly raisedBy: FieldRef<"Issue", "String">;
        readonly raisedOn: FieldRef<"Issue", "Surface">;
        readonly what: FieldRef<"Issue", "String">;
        readonly severity: FieldRef<"Issue", "Severity">;
        readonly affected: FieldRef<"Issue", "Int">;
        readonly acknowledgedBy: FieldRef<"Issue", "String">;
        readonly proposedFix: FieldRef<"Issue", "String">;
        readonly approvedBy: FieldRef<"Issue", "String">;
        readonly status: FieldRef<"Issue", "Status">;
        readonly framings: FieldRef<"Issue", "Json">;
    }

    // Custom InputTypes
    /**
     * Issue findUnique
     */
    export type IssueFindUniqueArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * Filter, which Issue to fetch.
         */
        where: IssueWhereUniqueInput;
    };

    /**
     * Issue findUniqueOrThrow
     */
    export type IssueFindUniqueOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * Filter, which Issue to fetch.
         */
        where: IssueWhereUniqueInput;
    };

    /**
     * Issue findFirst
     */
    export type IssueFindFirstArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * Filter, which Issue to fetch.
         */
        where?: IssueWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Issues to fetch.
         */
        orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Issues.
         */
        cursor?: IssueWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Issues from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Issues.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Issues.
         */
        distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[];
    };

    /**
     * Issue findFirstOrThrow
     */
    export type IssueFindFirstOrThrowArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * Filter, which Issue to fetch.
         */
        where?: IssueWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Issues to fetch.
         */
        orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Issues.
         */
        cursor?: IssueWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Issues from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Issues.
         */
        skip?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Issues.
         */
        distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[];
    };

    /**
     * Issue findMany
     */
    export type IssueFindManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * Filter, which Issues to fetch.
         */
        where?: IssueWhereInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Issues to fetch.
         */
        orderBy?: IssueOrderByWithRelationInput | IssueOrderByWithRelationInput[];
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing Issues.
         */
        cursor?: IssueWhereUniqueInput;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Issues from the position of the cursor.
         */
        take?: number;
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Issues.
         */
        skip?: number;
        distinct?: IssueScalarFieldEnum | IssueScalarFieldEnum[];
    };

    /**
     * Issue create
     */
    export type IssueCreateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * The data needed to create a Issue.
         */
        data: XOR<IssueCreateInput, IssueUncheckedCreateInput>;
    };

    /**
     * Issue createMany
     */
    export type IssueCreateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to create many Issues.
         */
        data: IssueCreateManyInput | IssueCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * Issue createManyAndReturn
     */
    export type IssueCreateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelectCreateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * The data used to create many Issues.
         */
        data: IssueCreateManyInput | IssueCreateManyInput[];
        skipDuplicates?: boolean;
    };

    /**
     * Issue update
     */
    export type IssueUpdateArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * The data needed to update a Issue.
         */
        data: XOR<IssueUpdateInput, IssueUncheckedUpdateInput>;
        /**
         * Choose, which Issue to update.
         */
        where: IssueWhereUniqueInput;
    };

    /**
     * Issue updateMany
     */
    export type IssueUpdateManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * The data used to update Issues.
         */
        data: XOR<IssueUpdateManyMutationInput, IssueUncheckedUpdateManyInput>;
        /**
         * Filter which Issues to update
         */
        where?: IssueWhereInput;
        /**
         * Limit how many Issues to update.
         */
        limit?: number;
    };

    /**
     * Issue updateManyAndReturn
     */
    export type IssueUpdateManyAndReturnArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelectUpdateManyAndReturn<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * The data used to update Issues.
         */
        data: XOR<IssueUpdateManyMutationInput, IssueUncheckedUpdateManyInput>;
        /**
         * Filter which Issues to update
         */
        where?: IssueWhereInput;
        /**
         * Limit how many Issues to update.
         */
        limit?: number;
    };

    /**
     * Issue upsert
     */
    export type IssueUpsertArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * The filter to search for the Issue to update in case it exists.
         */
        where: IssueWhereUniqueInput;
        /**
         * In case the Issue found by the `where` argument doesn't exist, create a new Issue with this data.
         */
        create: XOR<IssueCreateInput, IssueUncheckedCreateInput>;
        /**
         * In case the Issue was found with the provided `where` argument, update it with this data.
         */
        update: XOR<IssueUpdateInput, IssueUncheckedUpdateInput>;
    };

    /**
     * Issue delete
     */
    export type IssueDeleteArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
        /**
         * Filter which Issue to delete.
         */
        where: IssueWhereUniqueInput;
    };

    /**
     * Issue deleteMany
     */
    export type IssueDeleteManyArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Filter which Issues to delete
         */
        where?: IssueWhereInput;
        /**
         * Limit how many Issues to delete.
         */
        limit?: number;
    };

    /**
     * Issue.timeline
     */
    export type Issue$timelineArgs<
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
     * Issue.views
     */
    export type Issue$viewsArgs<
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
     * Issue without action
     */
    export type IssueDefaultArgs<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        /**
         * Select specific fields to fetch from the Issue
         */
        select?: IssueSelect<ExtArgs> | null;
        /**
         * Omit specific fields from the Issue
         */
        omit?: IssueOmit<ExtArgs> | null;
        /**
         * Choose, which related nodes to fetch as well
         */
        include?: IssueInclude<ExtArgs> | null;
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
        issueId: string | null;
        at: Date | null;
        by: string | null;
        what: string | null;
    };

    export type EventMaxAggregateOutputType = {
        id: string | null;
        issueId: string | null;
        at: Date | null;
        by: string | null;
        what: string | null;
    };

    export type EventCountAggregateOutputType = {
        id: number;
        issueId: number;
        at: number;
        by: number;
        what: number;
        _all: number;
    };

    export type EventMinAggregateInputType = {
        id?: true;
        issueId?: true;
        at?: true;
        by?: true;
        what?: true;
    };

    export type EventMaxAggregateInputType = {
        id?: true;
        issueId?: true;
        at?: true;
        by?: true;
        what?: true;
    };

    export type EventCountAggregateInputType = {
        id?: true;
        issueId?: true;
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
        issueId: string;
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
                issueId?: boolean;
                at?: boolean;
                by?: boolean;
                what?: boolean;
                issue?: boolean | IssueDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["event"]
        >;

    export type EventSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            issueId?: boolean;
            at?: boolean;
            by?: boolean;
            what?: boolean;
            issue?: boolean | IssueDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["event"]
    >;

    export type EventSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            issueId?: boolean;
            at?: boolean;
            by?: boolean;
            what?: boolean;
            issue?: boolean | IssueDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["event"]
    >;

    export type EventSelectScalar = {
        id?: boolean;
        issueId?: boolean;
        at?: boolean;
        by?: boolean;
        what?: boolean;
    };

    export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<"id" | "issueId" | "at" | "by" | "what", ExtArgs["result"]["event"]>;
    export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        issue?: boolean | IssueDefaultArgs<ExtArgs>;
    };
    export type EventIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        issue?: boolean | IssueDefaultArgs<ExtArgs>;
    };
    export type EventIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        issue?: boolean | IssueDefaultArgs<ExtArgs>;
    };

    export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        {
            name: "Event";
            objects: {
                issue: Prisma.$IssuePayload<ExtArgs>;
            };
            scalars: $Extensions.GetPayloadResult<
                {
                    id: string;
                    issueId: string;
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
        issue<T extends IssueDefaultArgs<ExtArgs> = {}>(
            args?: Subset<T, IssueDefaultArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            | $Result.GetResult<
                  Prisma.$IssuePayload<ExtArgs>,
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
        readonly issueId: FieldRef<"Event", "String">;
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
        issueId: string | null;
        surface: $Enums.Surface | null;
        audience: $Enums.Audience | null;
        channel: string | null;
        ts: string | null;
        chatId: bigint | null;
        messageId: number | null;
    };

    export type ViewMaxAggregateOutputType = {
        id: string | null;
        issueId: string | null;
        surface: $Enums.Surface | null;
        audience: $Enums.Audience | null;
        channel: string | null;
        ts: string | null;
        chatId: bigint | null;
        messageId: number | null;
    };

    export type ViewCountAggregateOutputType = {
        id: number;
        issueId: number;
        surface: number;
        audience: number;
        channel: number;
        ts: number;
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
        issueId?: true;
        surface?: true;
        audience?: true;
        channel?: true;
        ts?: true;
        chatId?: true;
        messageId?: true;
    };

    export type ViewMaxAggregateInputType = {
        id?: true;
        issueId?: true;
        surface?: true;
        audience?: true;
        channel?: true;
        ts?: true;
        chatId?: true;
        messageId?: true;
    };

    export type ViewCountAggregateInputType = {
        id?: true;
        issueId?: true;
        surface?: true;
        audience?: true;
        channel?: true;
        ts?: true;
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
        issueId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel: string | null;
        ts: string | null;
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
                issueId?: boolean;
                surface?: boolean;
                audience?: boolean;
                channel?: boolean;
                ts?: boolean;
                chatId?: boolean;
                messageId?: boolean;
                issue?: boolean | IssueDefaultArgs<ExtArgs>;
            },
            ExtArgs["result"]["view"]
        >;

    export type ViewSelectCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            issueId?: boolean;
            surface?: boolean;
            audience?: boolean;
            channel?: boolean;
            ts?: boolean;
            chatId?: boolean;
            messageId?: boolean;
            issue?: boolean | IssueDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["view"]
    >;

    export type ViewSelectUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = $Extensions.GetSelect<
        {
            id?: boolean;
            issueId?: boolean;
            surface?: boolean;
            audience?: boolean;
            channel?: boolean;
            ts?: boolean;
            chatId?: boolean;
            messageId?: boolean;
            issue?: boolean | IssueDefaultArgs<ExtArgs>;
        },
        ExtArgs["result"]["view"]
    >;

    export type ViewSelectScalar = {
        id?: boolean;
        issueId?: boolean;
        surface?: boolean;
        audience?: boolean;
        channel?: boolean;
        ts?: boolean;
        chatId?: boolean;
        messageId?: boolean;
    };

    export type ViewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
        $Extensions.GetOmit<
            "id" | "issueId" | "surface" | "audience" | "channel" | "ts" | "chatId" | "messageId",
            ExtArgs["result"]["view"]
        >;
    export type ViewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        issue?: boolean | IssueDefaultArgs<ExtArgs>;
    };
    export type ViewIncludeCreateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        issue?: boolean | IssueDefaultArgs<ExtArgs>;
    };
    export type ViewIncludeUpdateManyAndReturn<
        ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    > = {
        issue?: boolean | IssueDefaultArgs<ExtArgs>;
    };

    export type $ViewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "View";
        objects: {
            issue: Prisma.$IssuePayload<ExtArgs>;
        };
        scalars: $Extensions.GetPayloadResult<
            {
                id: string;
                issueId: string;
                surface: $Enums.Surface;
                audience: $Enums.Audience;
                channel: string | null;
                ts: string | null;
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
        issue<T extends IssueDefaultArgs<ExtArgs> = {}>(
            args?: Subset<T, IssueDefaultArgs<ExtArgs>>,
        ): Prisma__IssueClient<
            | $Result.GetResult<
                  Prisma.$IssuePayload<ExtArgs>,
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
        readonly issueId: FieldRef<"View", "String">;
        readonly surface: FieldRef<"View", "Surface">;
        readonly audience: FieldRef<"View", "Audience">;
        readonly channel: FieldRef<"View", "String">;
        readonly ts: FieldRef<"View", "String">;
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

    export const IssueScalarFieldEnum: {
        id: "id";
        createdAt: "createdAt";
        updatedAt: "updatedAt";
        version: "version";
        raisedBy: "raisedBy";
        raisedOn: "raisedOn";
        what: "what";
        severity: "severity";
        affected: "affected";
        acknowledgedBy: "acknowledgedBy";
        proposedFix: "proposedFix";
        approvedBy: "approvedBy";
        status: "status";
        framings: "framings";
    };

    export type IssueScalarFieldEnum =
        (typeof IssueScalarFieldEnum)[keyof typeof IssueScalarFieldEnum];

    export const EventScalarFieldEnum: {
        id: "id";
        issueId: "issueId";
        at: "at";
        by: "by";
        what: "what";
    };

    export type EventScalarFieldEnum =
        (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum];

    export const ViewScalarFieldEnum: {
        id: "id";
        issueId: "issueId";
        surface: "surface";
        audience: "audience";
        channel: "channel";
        ts: "ts";
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

    export const JsonNullValueFilter: {
        DbNull: typeof DbNull;
        JsonNull: typeof JsonNull;
        AnyNull: typeof AnyNull;
    };

    export type JsonNullValueFilter =
        (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

    export const NullsOrder: {
        first: "first";
        last: "last";
    };

    export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

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
     * Reference to a field of type 'Int'
     */
    export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int">;

    /**
     * Reference to a field of type 'Int[]'
     */
    export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Int[]">;

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
     * Reference to a field of type 'Severity'
     */
    export type EnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Severity"
    >;

    /**
     * Reference to a field of type 'Severity[]'
     */
    export type ListEnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Severity[]"
    >;

    /**
     * Reference to a field of type 'Status'
     */
    export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, "Status">;

    /**
     * Reference to a field of type 'Status[]'
     */
    export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
        $PrismaModel,
        "Status[]"
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

    export type IssueWhereInput = {
        AND?: IssueWhereInput | IssueWhereInput[];
        OR?: IssueWhereInput[];
        NOT?: IssueWhereInput | IssueWhereInput[];
        id?: StringFilter<"Issue"> | string;
        createdAt?: DateTimeFilter<"Issue"> | Date | string;
        updatedAt?: DateTimeFilter<"Issue"> | Date | string;
        version?: IntFilter<"Issue"> | number;
        raisedBy?: StringFilter<"Issue"> | string;
        raisedOn?: EnumSurfaceFilter<"Issue"> | $Enums.Surface;
        what?: StringFilter<"Issue"> | string;
        severity?: EnumSeverityFilter<"Issue"> | $Enums.Severity;
        affected?: IntFilter<"Issue"> | number;
        acknowledgedBy?: StringNullableFilter<"Issue"> | string | null;
        proposedFix?: StringNullableFilter<"Issue"> | string | null;
        approvedBy?: StringNullableFilter<"Issue"> | string | null;
        status?: EnumStatusFilter<"Issue"> | $Enums.Status;
        framings?: JsonFilter<"Issue">;
        timeline?: EventListRelationFilter;
        views?: ViewListRelationFilter;
    };

    export type IssueOrderByWithRelationInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        raisedBy?: SortOrder;
        raisedOn?: SortOrder;
        what?: SortOrder;
        severity?: SortOrder;
        affected?: SortOrder;
        acknowledgedBy?: SortOrderInput | SortOrder;
        proposedFix?: SortOrderInput | SortOrder;
        approvedBy?: SortOrderInput | SortOrder;
        status?: SortOrder;
        framings?: SortOrder;
        timeline?: EventOrderByRelationAggregateInput;
        views?: ViewOrderByRelationAggregateInput;
    };

    export type IssueWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            AND?: IssueWhereInput | IssueWhereInput[];
            OR?: IssueWhereInput[];
            NOT?: IssueWhereInput | IssueWhereInput[];
            createdAt?: DateTimeFilter<"Issue"> | Date | string;
            updatedAt?: DateTimeFilter<"Issue"> | Date | string;
            version?: IntFilter<"Issue"> | number;
            raisedBy?: StringFilter<"Issue"> | string;
            raisedOn?: EnumSurfaceFilter<"Issue"> | $Enums.Surface;
            what?: StringFilter<"Issue"> | string;
            severity?: EnumSeverityFilter<"Issue"> | $Enums.Severity;
            affected?: IntFilter<"Issue"> | number;
            acknowledgedBy?: StringNullableFilter<"Issue"> | string | null;
            proposedFix?: StringNullableFilter<"Issue"> | string | null;
            approvedBy?: StringNullableFilter<"Issue"> | string | null;
            status?: EnumStatusFilter<"Issue"> | $Enums.Status;
            framings?: JsonFilter<"Issue">;
            timeline?: EventListRelationFilter;
            views?: ViewListRelationFilter;
        },
        "id"
    >;

    export type IssueOrderByWithAggregationInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        raisedBy?: SortOrder;
        raisedOn?: SortOrder;
        what?: SortOrder;
        severity?: SortOrder;
        affected?: SortOrder;
        acknowledgedBy?: SortOrderInput | SortOrder;
        proposedFix?: SortOrderInput | SortOrder;
        approvedBy?: SortOrderInput | SortOrder;
        status?: SortOrder;
        framings?: SortOrder;
        _count?: IssueCountOrderByAggregateInput;
        _avg?: IssueAvgOrderByAggregateInput;
        _max?: IssueMaxOrderByAggregateInput;
        _min?: IssueMinOrderByAggregateInput;
        _sum?: IssueSumOrderByAggregateInput;
    };

    export type IssueScalarWhereWithAggregatesInput = {
        AND?: IssueScalarWhereWithAggregatesInput | IssueScalarWhereWithAggregatesInput[];
        OR?: IssueScalarWhereWithAggregatesInput[];
        NOT?: IssueScalarWhereWithAggregatesInput | IssueScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Issue"> | string;
        createdAt?: DateTimeWithAggregatesFilter<"Issue"> | Date | string;
        updatedAt?: DateTimeWithAggregatesFilter<"Issue"> | Date | string;
        version?: IntWithAggregatesFilter<"Issue"> | number;
        raisedBy?: StringWithAggregatesFilter<"Issue"> | string;
        raisedOn?: EnumSurfaceWithAggregatesFilter<"Issue"> | $Enums.Surface;
        what?: StringWithAggregatesFilter<"Issue"> | string;
        severity?: EnumSeverityWithAggregatesFilter<"Issue"> | $Enums.Severity;
        affected?: IntWithAggregatesFilter<"Issue"> | number;
        acknowledgedBy?: StringNullableWithAggregatesFilter<"Issue"> | string | null;
        proposedFix?: StringNullableWithAggregatesFilter<"Issue"> | string | null;
        approvedBy?: StringNullableWithAggregatesFilter<"Issue"> | string | null;
        status?: EnumStatusWithAggregatesFilter<"Issue"> | $Enums.Status;
        framings?: JsonWithAggregatesFilter<"Issue">;
    };

    export type EventWhereInput = {
        AND?: EventWhereInput | EventWhereInput[];
        OR?: EventWhereInput[];
        NOT?: EventWhereInput | EventWhereInput[];
        id?: StringFilter<"Event"> | string;
        issueId?: StringFilter<"Event"> | string;
        at?: DateTimeFilter<"Event"> | Date | string;
        by?: StringFilter<"Event"> | string;
        what?: StringFilter<"Event"> | string;
        issue?: XOR<IssueScalarRelationFilter, IssueWhereInput>;
    };

    export type EventOrderByWithRelationInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
        issue?: IssueOrderByWithRelationInput;
    };

    export type EventWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            AND?: EventWhereInput | EventWhereInput[];
            OR?: EventWhereInput[];
            NOT?: EventWhereInput | EventWhereInput[];
            issueId?: StringFilter<"Event"> | string;
            at?: DateTimeFilter<"Event"> | Date | string;
            by?: StringFilter<"Event"> | string;
            what?: StringFilter<"Event"> | string;
            issue?: XOR<IssueScalarRelationFilter, IssueWhereInput>;
        },
        "id"
    >;

    export type EventOrderByWithAggregationInput = {
        id?: SortOrder;
        issueId?: SortOrder;
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
        issueId?: StringWithAggregatesFilter<"Event"> | string;
        at?: DateTimeWithAggregatesFilter<"Event"> | Date | string;
        by?: StringWithAggregatesFilter<"Event"> | string;
        what?: StringWithAggregatesFilter<"Event"> | string;
    };

    export type ViewWhereInput = {
        AND?: ViewWhereInput | ViewWhereInput[];
        OR?: ViewWhereInput[];
        NOT?: ViewWhereInput | ViewWhereInput[];
        id?: StringFilter<"View"> | string;
        issueId?: StringFilter<"View"> | string;
        surface?: EnumSurfaceFilter<"View"> | $Enums.Surface;
        audience?: EnumAudienceFilter<"View"> | $Enums.Audience;
        channel?: StringNullableFilter<"View"> | string | null;
        ts?: StringNullableFilter<"View"> | string | null;
        chatId?: BigIntNullableFilter<"View"> | bigint | number | null;
        messageId?: IntNullableFilter<"View"> | number | null;
        issue?: XOR<IssueScalarRelationFilter, IssueWhereInput>;
    };

    export type ViewOrderByWithRelationInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrderInput | SortOrder;
        ts?: SortOrderInput | SortOrder;
        chatId?: SortOrderInput | SortOrder;
        messageId?: SortOrderInput | SortOrder;
        issue?: IssueOrderByWithRelationInput;
    };

    export type ViewWhereUniqueInput = Prisma.AtLeast<
        {
            id?: string;
            issueId_surface_audience_chatId?: ViewIssueIdSurfaceAudienceChatIdCompoundUniqueInput;
            AND?: ViewWhereInput | ViewWhereInput[];
            OR?: ViewWhereInput[];
            NOT?: ViewWhereInput | ViewWhereInput[];
            issueId?: StringFilter<"View"> | string;
            surface?: EnumSurfaceFilter<"View"> | $Enums.Surface;
            audience?: EnumAudienceFilter<"View"> | $Enums.Audience;
            channel?: StringNullableFilter<"View"> | string | null;
            ts?: StringNullableFilter<"View"> | string | null;
            chatId?: BigIntNullableFilter<"View"> | bigint | number | null;
            messageId?: IntNullableFilter<"View"> | number | null;
            issue?: XOR<IssueScalarRelationFilter, IssueWhereInput>;
        },
        "id" | "issueId_surface_audience_chatId"
    >;

    export type ViewOrderByWithAggregationInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrderInput | SortOrder;
        ts?: SortOrderInput | SortOrder;
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
        issueId?: StringWithAggregatesFilter<"View"> | string;
        surface?: EnumSurfaceWithAggregatesFilter<"View"> | $Enums.Surface;
        audience?: EnumAudienceWithAggregatesFilter<"View"> | $Enums.Audience;
        channel?: StringNullableWithAggregatesFilter<"View"> | string | null;
        ts?: StringNullableWithAggregatesFilter<"View"> | string | null;
        chatId?: BigIntNullableWithAggregatesFilter<"View"> | bigint | number | null;
        messageId?: IntNullableWithAggregatesFilter<"View"> | number | null;
    };

    export type IssueCreateInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventCreateNestedManyWithoutIssueInput;
        views?: ViewCreateNestedManyWithoutIssueInput;
    };

    export type IssueUncheckedCreateInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedCreateNestedManyWithoutIssueInput;
        views?: ViewUncheckedCreateNestedManyWithoutIssueInput;
    };

    export type IssueUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUpdateManyWithoutIssueNestedInput;
        views?: ViewUpdateManyWithoutIssueNestedInput;
    };

    export type IssueUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedUpdateManyWithoutIssueNestedInput;
        views?: ViewUncheckedUpdateManyWithoutIssueNestedInput;
    };

    export type IssueCreateManyInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type IssueUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type IssueUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
    };

    export type EventCreateInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
        issue: IssueCreateNestedOneWithoutTimelineInput;
    };

    export type EventUncheckedCreateInput = {
        id?: string;
        issueId: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
        issue?: IssueUpdateOneRequiredWithoutTimelineNestedInput;
    };

    export type EventUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        issueId?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventCreateManyInput = {
        id?: string;
        issueId: string;
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
        issueId?: StringFieldUpdateOperationsInput | string;
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
        chatId?: bigint | number | null;
        messageId?: number | null;
        issue: IssueCreateNestedOneWithoutViewsInput;
    };

    export type ViewUncheckedCreateInput = {
        id?: string;
        issueId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
        issue?: IssueUpdateOneRequiredWithoutViewsNestedInput;
    };

    export type ViewUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        issueId?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewCreateManyInput = {
        id?: string;
        issueId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        issueId?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
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

    export type EnumSurfaceFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceFilter<$PrismaModel> | $Enums.Surface;
    };

    export type EnumSeverityFilter<$PrismaModel = never> = {
        equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>;
        in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity;
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

    export type EnumStatusFilter<$PrismaModel = never> = {
        equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status;
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

    export type SortOrderInput = {
        sort: SortOrder;
        nulls?: NullsOrder;
    };

    export type EventOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };

    export type ViewOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };

    export type IssueCountOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        raisedBy?: SortOrder;
        raisedOn?: SortOrder;
        what?: SortOrder;
        severity?: SortOrder;
        affected?: SortOrder;
        acknowledgedBy?: SortOrder;
        proposedFix?: SortOrder;
        approvedBy?: SortOrder;
        status?: SortOrder;
        framings?: SortOrder;
    };

    export type IssueAvgOrderByAggregateInput = {
        version?: SortOrder;
        affected?: SortOrder;
    };

    export type IssueMaxOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        raisedBy?: SortOrder;
        raisedOn?: SortOrder;
        what?: SortOrder;
        severity?: SortOrder;
        affected?: SortOrder;
        acknowledgedBy?: SortOrder;
        proposedFix?: SortOrder;
        approvedBy?: SortOrder;
        status?: SortOrder;
    };

    export type IssueMinOrderByAggregateInput = {
        id?: SortOrder;
        createdAt?: SortOrder;
        updatedAt?: SortOrder;
        version?: SortOrder;
        raisedBy?: SortOrder;
        raisedOn?: SortOrder;
        what?: SortOrder;
        severity?: SortOrder;
        affected?: SortOrder;
        acknowledgedBy?: SortOrder;
        proposedFix?: SortOrder;
        approvedBy?: SortOrder;
        status?: SortOrder;
    };

    export type IssueSumOrderByAggregateInput = {
        version?: SortOrder;
        affected?: SortOrder;
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

    export type EnumSurfaceWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceWithAggregatesFilter<$PrismaModel> | $Enums.Surface;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSurfaceFilter<$PrismaModel>;
        _max?: NestedEnumSurfaceFilter<$PrismaModel>;
    };

    export type EnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>;
        in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSeverityFilter<$PrismaModel>;
        _max?: NestedEnumSeverityFilter<$PrismaModel>;
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

    export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumStatusFilter<$PrismaModel>;
        _max?: NestedEnumStatusFilter<$PrismaModel>;
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

    export type IssueScalarRelationFilter = {
        is?: IssueWhereInput;
        isNot?: IssueWhereInput;
    };

    export type EventCountOrderByAggregateInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
    };

    export type EventMaxOrderByAggregateInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        at?: SortOrder;
        by?: SortOrder;
        what?: SortOrder;
    };

    export type EventMinOrderByAggregateInput = {
        id?: SortOrder;
        issueId?: SortOrder;
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

    export type ViewIssueIdSurfaceAudienceChatIdCompoundUniqueInput = {
        issueId: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        chatId: bigint | number;
    };

    export type ViewCountOrderByAggregateInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrder;
        ts?: SortOrder;
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewAvgOrderByAggregateInput = {
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewMaxOrderByAggregateInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrder;
        ts?: SortOrder;
        chatId?: SortOrder;
        messageId?: SortOrder;
    };

    export type ViewMinOrderByAggregateInput = {
        id?: SortOrder;
        issueId?: SortOrder;
        surface?: SortOrder;
        audience?: SortOrder;
        channel?: SortOrder;
        ts?: SortOrder;
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

    export type EventCreateNestedManyWithoutIssueInput = {
        create?:
            | XOR<EventCreateWithoutIssueInput, EventUncheckedCreateWithoutIssueInput>
            | EventCreateWithoutIssueInput[]
            | EventUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutIssueInput | EventCreateOrConnectWithoutIssueInput[];
        createMany?: EventCreateManyIssueInputEnvelope;
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
    };

    export type ViewCreateNestedManyWithoutIssueInput = {
        create?:
            | XOR<ViewCreateWithoutIssueInput, ViewUncheckedCreateWithoutIssueInput>
            | ViewCreateWithoutIssueInput[]
            | ViewUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutIssueInput | ViewCreateOrConnectWithoutIssueInput[];
        createMany?: ViewCreateManyIssueInputEnvelope;
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
    };

    export type EventUncheckedCreateNestedManyWithoutIssueInput = {
        create?:
            | XOR<EventCreateWithoutIssueInput, EventUncheckedCreateWithoutIssueInput>
            | EventCreateWithoutIssueInput[]
            | EventUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutIssueInput | EventCreateOrConnectWithoutIssueInput[];
        createMany?: EventCreateManyIssueInputEnvelope;
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
    };

    export type ViewUncheckedCreateNestedManyWithoutIssueInput = {
        create?:
            | XOR<ViewCreateWithoutIssueInput, ViewUncheckedCreateWithoutIssueInput>
            | ViewCreateWithoutIssueInput[]
            | ViewUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutIssueInput | ViewCreateOrConnectWithoutIssueInput[];
        createMany?: ViewCreateManyIssueInputEnvelope;
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
    };

    export type StringFieldUpdateOperationsInput = {
        set?: string;
    };

    export type DateTimeFieldUpdateOperationsInput = {
        set?: Date | string;
    };

    export type IntFieldUpdateOperationsInput = {
        set?: number;
        increment?: number;
        decrement?: number;
        multiply?: number;
        divide?: number;
    };

    export type EnumSurfaceFieldUpdateOperationsInput = {
        set?: $Enums.Surface;
    };

    export type EnumSeverityFieldUpdateOperationsInput = {
        set?: $Enums.Severity;
    };

    export type NullableStringFieldUpdateOperationsInput = {
        set?: string | null;
    };

    export type EnumStatusFieldUpdateOperationsInput = {
        set?: $Enums.Status;
    };

    export type EventUpdateManyWithoutIssueNestedInput = {
        create?:
            | XOR<EventCreateWithoutIssueInput, EventUncheckedCreateWithoutIssueInput>
            | EventCreateWithoutIssueInput[]
            | EventUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutIssueInput | EventCreateOrConnectWithoutIssueInput[];
        upsert?:
            | EventUpsertWithWhereUniqueWithoutIssueInput
            | EventUpsertWithWhereUniqueWithoutIssueInput[];
        createMany?: EventCreateManyIssueInputEnvelope;
        set?: EventWhereUniqueInput | EventWhereUniqueInput[];
        disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        delete?: EventWhereUniqueInput | EventWhereUniqueInput[];
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        update?:
            | EventUpdateWithWhereUniqueWithoutIssueInput
            | EventUpdateWithWhereUniqueWithoutIssueInput[];
        updateMany?:
            EventUpdateManyWithWhereWithoutIssueInput | EventUpdateManyWithWhereWithoutIssueInput[];
        deleteMany?: EventScalarWhereInput | EventScalarWhereInput[];
    };

    export type ViewUpdateManyWithoutIssueNestedInput = {
        create?:
            | XOR<ViewCreateWithoutIssueInput, ViewUncheckedCreateWithoutIssueInput>
            | ViewCreateWithoutIssueInput[]
            | ViewUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutIssueInput | ViewCreateOrConnectWithoutIssueInput[];
        upsert?:
            | ViewUpsertWithWhereUniqueWithoutIssueInput
            | ViewUpsertWithWhereUniqueWithoutIssueInput[];
        createMany?: ViewCreateManyIssueInputEnvelope;
        set?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        disconnect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        delete?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        update?:
            | ViewUpdateWithWhereUniqueWithoutIssueInput
            | ViewUpdateWithWhereUniqueWithoutIssueInput[];
        updateMany?:
            ViewUpdateManyWithWhereWithoutIssueInput | ViewUpdateManyWithWhereWithoutIssueInput[];
        deleteMany?: ViewScalarWhereInput | ViewScalarWhereInput[];
    };

    export type EventUncheckedUpdateManyWithoutIssueNestedInput = {
        create?:
            | XOR<EventCreateWithoutIssueInput, EventUncheckedCreateWithoutIssueInput>
            | EventCreateWithoutIssueInput[]
            | EventUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            EventCreateOrConnectWithoutIssueInput | EventCreateOrConnectWithoutIssueInput[];
        upsert?:
            | EventUpsertWithWhereUniqueWithoutIssueInput
            | EventUpsertWithWhereUniqueWithoutIssueInput[];
        createMany?: EventCreateManyIssueInputEnvelope;
        set?: EventWhereUniqueInput | EventWhereUniqueInput[];
        disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        delete?: EventWhereUniqueInput | EventWhereUniqueInput[];
        connect?: EventWhereUniqueInput | EventWhereUniqueInput[];
        update?:
            | EventUpdateWithWhereUniqueWithoutIssueInput
            | EventUpdateWithWhereUniqueWithoutIssueInput[];
        updateMany?:
            EventUpdateManyWithWhereWithoutIssueInput | EventUpdateManyWithWhereWithoutIssueInput[];
        deleteMany?: EventScalarWhereInput | EventScalarWhereInput[];
    };

    export type ViewUncheckedUpdateManyWithoutIssueNestedInput = {
        create?:
            | XOR<ViewCreateWithoutIssueInput, ViewUncheckedCreateWithoutIssueInput>
            | ViewCreateWithoutIssueInput[]
            | ViewUncheckedCreateWithoutIssueInput[];
        connectOrCreate?:
            ViewCreateOrConnectWithoutIssueInput | ViewCreateOrConnectWithoutIssueInput[];
        upsert?:
            | ViewUpsertWithWhereUniqueWithoutIssueInput
            | ViewUpsertWithWhereUniqueWithoutIssueInput[];
        createMany?: ViewCreateManyIssueInputEnvelope;
        set?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        disconnect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        delete?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        connect?: ViewWhereUniqueInput | ViewWhereUniqueInput[];
        update?:
            | ViewUpdateWithWhereUniqueWithoutIssueInput
            | ViewUpdateWithWhereUniqueWithoutIssueInput[];
        updateMany?:
            ViewUpdateManyWithWhereWithoutIssueInput | ViewUpdateManyWithWhereWithoutIssueInput[];
        deleteMany?: ViewScalarWhereInput | ViewScalarWhereInput[];
    };

    export type IssueCreateNestedOneWithoutTimelineInput = {
        create?: XOR<IssueCreateWithoutTimelineInput, IssueUncheckedCreateWithoutTimelineInput>;
        connectOrCreate?: IssueCreateOrConnectWithoutTimelineInput;
        connect?: IssueWhereUniqueInput;
    };

    export type IssueUpdateOneRequiredWithoutTimelineNestedInput = {
        create?: XOR<IssueCreateWithoutTimelineInput, IssueUncheckedCreateWithoutTimelineInput>;
        connectOrCreate?: IssueCreateOrConnectWithoutTimelineInput;
        upsert?: IssueUpsertWithoutTimelineInput;
        connect?: IssueWhereUniqueInput;
        update?: XOR<
            XOR<IssueUpdateToOneWithWhereWithoutTimelineInput, IssueUpdateWithoutTimelineInput>,
            IssueUncheckedUpdateWithoutTimelineInput
        >;
    };

    export type IssueCreateNestedOneWithoutViewsInput = {
        create?: XOR<IssueCreateWithoutViewsInput, IssueUncheckedCreateWithoutViewsInput>;
        connectOrCreate?: IssueCreateOrConnectWithoutViewsInput;
        connect?: IssueWhereUniqueInput;
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

    export type IssueUpdateOneRequiredWithoutViewsNestedInput = {
        create?: XOR<IssueCreateWithoutViewsInput, IssueUncheckedCreateWithoutViewsInput>;
        connectOrCreate?: IssueCreateOrConnectWithoutViewsInput;
        upsert?: IssueUpsertWithoutViewsInput;
        connect?: IssueWhereUniqueInput;
        update?: XOR<
            XOR<IssueUpdateToOneWithWhereWithoutViewsInput, IssueUpdateWithoutViewsInput>,
            IssueUncheckedUpdateWithoutViewsInput
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

    export type NestedEnumSurfaceFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceFilter<$PrismaModel> | $Enums.Surface;
    };

    export type NestedEnumSeverityFilter<$PrismaModel = never> = {
        equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>;
        in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity;
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

    export type NestedEnumStatusFilter<$PrismaModel = never> = {
        equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status;
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

    export type NestedEnumSurfaceWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Surface | EnumSurfaceFieldRefInput<$PrismaModel>;
        in?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Surface[] | ListEnumSurfaceFieldRefInput<$PrismaModel>;
        not?: NestedEnumSurfaceWithAggregatesFilter<$PrismaModel> | $Enums.Surface;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSurfaceFilter<$PrismaModel>;
        _max?: NestedEnumSurfaceFilter<$PrismaModel>;
    };

    export type NestedEnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>;
        in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>;
        not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumSeverityFilter<$PrismaModel>;
        _max?: NestedEnumSeverityFilter<$PrismaModel>;
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

    export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumStatusFilter<$PrismaModel>;
        _max?: NestedEnumStatusFilter<$PrismaModel>;
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

    export type EventCreateWithoutIssueInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventUncheckedCreateWithoutIssueInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type EventCreateOrConnectWithoutIssueInput = {
        where: EventWhereUniqueInput;
        create: XOR<EventCreateWithoutIssueInput, EventUncheckedCreateWithoutIssueInput>;
    };

    export type EventCreateManyIssueInputEnvelope = {
        data: EventCreateManyIssueInput | EventCreateManyIssueInput[];
        skipDuplicates?: boolean;
    };

    export type ViewCreateWithoutIssueInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewUncheckedCreateWithoutIssueInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type ViewCreateOrConnectWithoutIssueInput = {
        where: ViewWhereUniqueInput;
        create: XOR<ViewCreateWithoutIssueInput, ViewUncheckedCreateWithoutIssueInput>;
    };

    export type ViewCreateManyIssueInputEnvelope = {
        data: ViewCreateManyIssueInput | ViewCreateManyIssueInput[];
        skipDuplicates?: boolean;
    };

    export type EventUpsertWithWhereUniqueWithoutIssueInput = {
        where: EventWhereUniqueInput;
        update: XOR<EventUpdateWithoutIssueInput, EventUncheckedUpdateWithoutIssueInput>;
        create: XOR<EventCreateWithoutIssueInput, EventUncheckedCreateWithoutIssueInput>;
    };

    export type EventUpdateWithWhereUniqueWithoutIssueInput = {
        where: EventWhereUniqueInput;
        data: XOR<EventUpdateWithoutIssueInput, EventUncheckedUpdateWithoutIssueInput>;
    };

    export type EventUpdateManyWithWhereWithoutIssueInput = {
        where: EventScalarWhereInput;
        data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutIssueInput>;
    };

    export type EventScalarWhereInput = {
        AND?: EventScalarWhereInput | EventScalarWhereInput[];
        OR?: EventScalarWhereInput[];
        NOT?: EventScalarWhereInput | EventScalarWhereInput[];
        id?: StringFilter<"Event"> | string;
        issueId?: StringFilter<"Event"> | string;
        at?: DateTimeFilter<"Event"> | Date | string;
        by?: StringFilter<"Event"> | string;
        what?: StringFilter<"Event"> | string;
    };

    export type ViewUpsertWithWhereUniqueWithoutIssueInput = {
        where: ViewWhereUniqueInput;
        update: XOR<ViewUpdateWithoutIssueInput, ViewUncheckedUpdateWithoutIssueInput>;
        create: XOR<ViewCreateWithoutIssueInput, ViewUncheckedCreateWithoutIssueInput>;
    };

    export type ViewUpdateWithWhereUniqueWithoutIssueInput = {
        where: ViewWhereUniqueInput;
        data: XOR<ViewUpdateWithoutIssueInput, ViewUncheckedUpdateWithoutIssueInput>;
    };

    export type ViewUpdateManyWithWhereWithoutIssueInput = {
        where: ViewScalarWhereInput;
        data: XOR<ViewUpdateManyMutationInput, ViewUncheckedUpdateManyWithoutIssueInput>;
    };

    export type ViewScalarWhereInput = {
        AND?: ViewScalarWhereInput | ViewScalarWhereInput[];
        OR?: ViewScalarWhereInput[];
        NOT?: ViewScalarWhereInput | ViewScalarWhereInput[];
        id?: StringFilter<"View"> | string;
        issueId?: StringFilter<"View"> | string;
        surface?: EnumSurfaceFilter<"View"> | $Enums.Surface;
        audience?: EnumAudienceFilter<"View"> | $Enums.Audience;
        channel?: StringNullableFilter<"View"> | string | null;
        ts?: StringNullableFilter<"View"> | string | null;
        chatId?: BigIntNullableFilter<"View"> | bigint | number | null;
        messageId?: IntNullableFilter<"View"> | number | null;
    };

    export type IssueCreateWithoutTimelineInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        views?: ViewCreateNestedManyWithoutIssueInput;
    };

    export type IssueUncheckedCreateWithoutTimelineInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        views?: ViewUncheckedCreateNestedManyWithoutIssueInput;
    };

    export type IssueCreateOrConnectWithoutTimelineInput = {
        where: IssueWhereUniqueInput;
        create: XOR<IssueCreateWithoutTimelineInput, IssueUncheckedCreateWithoutTimelineInput>;
    };

    export type IssueUpsertWithoutTimelineInput = {
        update: XOR<IssueUpdateWithoutTimelineInput, IssueUncheckedUpdateWithoutTimelineInput>;
        create: XOR<IssueCreateWithoutTimelineInput, IssueUncheckedCreateWithoutTimelineInput>;
        where?: IssueWhereInput;
    };

    export type IssueUpdateToOneWithWhereWithoutTimelineInput = {
        where?: IssueWhereInput;
        data: XOR<IssueUpdateWithoutTimelineInput, IssueUncheckedUpdateWithoutTimelineInput>;
    };

    export type IssueUpdateWithoutTimelineInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        views?: ViewUpdateManyWithoutIssueNestedInput;
    };

    export type IssueUncheckedUpdateWithoutTimelineInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        views?: ViewUncheckedUpdateManyWithoutIssueNestedInput;
    };

    export type IssueCreateWithoutViewsInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventCreateNestedManyWithoutIssueInput;
    };

    export type IssueUncheckedCreateWithoutViewsInput = {
        id?: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
        version?: number;
        raisedBy: string;
        raisedOn: $Enums.Surface;
        what: string;
        severity?: $Enums.Severity;
        affected?: number;
        acknowledgedBy?: string | null;
        proposedFix?: string | null;
        approvedBy?: string | null;
        status?: $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedCreateNestedManyWithoutIssueInput;
    };

    export type IssueCreateOrConnectWithoutViewsInput = {
        where: IssueWhereUniqueInput;
        create: XOR<IssueCreateWithoutViewsInput, IssueUncheckedCreateWithoutViewsInput>;
    };

    export type IssueUpsertWithoutViewsInput = {
        update: XOR<IssueUpdateWithoutViewsInput, IssueUncheckedUpdateWithoutViewsInput>;
        create: XOR<IssueCreateWithoutViewsInput, IssueUncheckedCreateWithoutViewsInput>;
        where?: IssueWhereInput;
    };

    export type IssueUpdateToOneWithWhereWithoutViewsInput = {
        where?: IssueWhereInput;
        data: XOR<IssueUpdateWithoutViewsInput, IssueUncheckedUpdateWithoutViewsInput>;
    };

    export type IssueUpdateWithoutViewsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUpdateManyWithoutIssueNestedInput;
    };

    export type IssueUncheckedUpdateWithoutViewsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        version?: IntFieldUpdateOperationsInput | number;
        raisedBy?: StringFieldUpdateOperationsInput | string;
        raisedOn?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        what?: StringFieldUpdateOperationsInput | string;
        severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity;
        affected?: IntFieldUpdateOperationsInput | number;
        acknowledgedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        proposedFix?: NullableStringFieldUpdateOperationsInput | string | null;
        approvedBy?: NullableStringFieldUpdateOperationsInput | string | null;
        status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status;
        framings?: JsonNullValueInput | InputJsonValue;
        timeline?: EventUncheckedUpdateManyWithoutIssueNestedInput;
    };

    export type EventCreateManyIssueInput = {
        id?: string;
        at?: Date | string;
        by: string;
        what: string;
    };

    export type ViewCreateManyIssueInput = {
        id?: string;
        surface: $Enums.Surface;
        audience: $Enums.Audience;
        channel?: string | null;
        ts?: string | null;
        chatId?: bigint | number | null;
        messageId?: number | null;
    };

    export type EventUpdateWithoutIssueInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventUncheckedUpdateWithoutIssueInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type EventUncheckedUpdateManyWithoutIssueInput = {
        id?: StringFieldUpdateOperationsInput | string;
        at?: DateTimeFieldUpdateOperationsInput | Date | string;
        by?: StringFieldUpdateOperationsInput | string;
        what?: StringFieldUpdateOperationsInput | string;
    };

    export type ViewUpdateWithoutIssueInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewUncheckedUpdateWithoutIssueInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
        chatId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
        messageId?: NullableIntFieldUpdateOperationsInput | number | null;
    };

    export type ViewUncheckedUpdateManyWithoutIssueInput = {
        id?: StringFieldUpdateOperationsInput | string;
        surface?: EnumSurfaceFieldUpdateOperationsInput | $Enums.Surface;
        audience?: EnumAudienceFieldUpdateOperationsInput | $Enums.Audience;
        channel?: NullableStringFieldUpdateOperationsInput | string | null;
        ts?: NullableStringFieldUpdateOperationsInput | string | null;
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
