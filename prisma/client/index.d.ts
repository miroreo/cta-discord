
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model alert_history
 * 
 */
export type alert_history = $Result.DefaultSelection<Prisma.$alert_historyPayload>
/**
 * Model guilds
 * 
 */
export type guilds = $Result.DefaultSelection<Prisma.$guildsPayload>
/**
 * Model kv_store
 * 
 */
export type kv_store = $Result.DefaultSelection<Prisma.$kv_storePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Alert_histories
 * const alert_histories = await prisma.alert_history.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Alert_histories
   * const alert_histories = await prisma.alert_history.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.alert_history`: Exposes CRUD operations for the **alert_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alert_histories
    * const alert_histories = await prisma.alert_history.findMany()
    * ```
    */
  get alert_history(): Prisma.alert_historyDelegate<ExtArgs>;

  /**
   * `prisma.guilds`: Exposes CRUD operations for the **guilds** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guilds
    * const guilds = await prisma.guilds.findMany()
    * ```
    */
  get guilds(): Prisma.guildsDelegate<ExtArgs>;

  /**
   * `prisma.kv_store`: Exposes CRUD operations for the **kv_store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kv_stores
    * const kv_stores = await prisma.kv_store.findMany()
    * ```
    */
  get kv_store(): Prisma.kv_storeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.10.2
   * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    alert_history: 'alert_history',
    guilds: 'guilds',
    kv_store: 'kv_store'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'alert_history' | 'guilds' | 'kv_store'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      alert_history: {
        payload: Prisma.$alert_historyPayload<ExtArgs>
        fields: Prisma.alert_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.alert_historyFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.alert_historyFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>
          }
          findFirst: {
            args: Prisma.alert_historyFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.alert_historyFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>
          }
          findMany: {
            args: Prisma.alert_historyFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>[]
          }
          create: {
            args: Prisma.alert_historyCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>
          }
          createMany: {
            args: Prisma.alert_historyCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.alert_historyDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>
          }
          update: {
            args: Prisma.alert_historyUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>
          }
          deleteMany: {
            args: Prisma.alert_historyDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.alert_historyUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.alert_historyUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$alert_historyPayload>
          }
          aggregate: {
            args: Prisma.Alert_historyAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAlert_history>
          }
          groupBy: {
            args: Prisma.alert_historyGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Alert_historyGroupByOutputType>[]
          }
          count: {
            args: Prisma.alert_historyCountArgs<ExtArgs>,
            result: $Utils.Optional<Alert_historyCountAggregateOutputType> | number
          }
        }
      }
      guilds: {
        payload: Prisma.$guildsPayload<ExtArgs>
        fields: Prisma.guildsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.guildsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.guildsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          findFirst: {
            args: Prisma.guildsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.guildsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          findMany: {
            args: Prisma.guildsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>[]
          }
          create: {
            args: Prisma.guildsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          createMany: {
            args: Prisma.guildsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.guildsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          update: {
            args: Prisma.guildsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          deleteMany: {
            args: Prisma.guildsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.guildsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.guildsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          aggregate: {
            args: Prisma.GuildsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGuilds>
          }
          groupBy: {
            args: Prisma.guildsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GuildsGroupByOutputType>[]
          }
          count: {
            args: Prisma.guildsCountArgs<ExtArgs>,
            result: $Utils.Optional<GuildsCountAggregateOutputType> | number
          }
        }
      }
      kv_store: {
        payload: Prisma.$kv_storePayload<ExtArgs>
        fields: Prisma.kv_storeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.kv_storeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.kv_storeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>
          }
          findFirst: {
            args: Prisma.kv_storeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.kv_storeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>
          }
          findMany: {
            args: Prisma.kv_storeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>[]
          }
          create: {
            args: Prisma.kv_storeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>
          }
          createMany: {
            args: Prisma.kv_storeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.kv_storeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>
          }
          update: {
            args: Prisma.kv_storeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>
          }
          deleteMany: {
            args: Prisma.kv_storeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.kv_storeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.kv_storeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$kv_storePayload>
          }
          aggregate: {
            args: Prisma.Kv_storeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateKv_store>
          }
          groupBy: {
            args: Prisma.kv_storeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Kv_storeGroupByOutputType>[]
          }
          count: {
            args: Prisma.kv_storeCountArgs<ExtArgs>,
            result: $Utils.Optional<Kv_storeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model alert_history
   */

  export type AggregateAlert_history = {
    _count: Alert_historyCountAggregateOutputType | null
    _avg: Alert_historyAvgAggregateOutputType | null
    _sum: Alert_historySumAggregateOutputType | null
    _min: Alert_historyMinAggregateOutputType | null
    _max: Alert_historyMaxAggregateOutputType | null
  }

  export type Alert_historyAvgAggregateOutputType = {
    alert_id: number | null
    published_to: number | null
  }

  export type Alert_historySumAggregateOutputType = {
    alert_id: number | null
    published_to: number | null
  }

  export type Alert_historyMinAggregateOutputType = {
    alert_id: number | null
    headline: string | null
    short_description: string | null
    guid: string | null
    published_to: number | null
  }

  export type Alert_historyMaxAggregateOutputType = {
    alert_id: number | null
    headline: string | null
    short_description: string | null
    guid: string | null
    published_to: number | null
  }

  export type Alert_historyCountAggregateOutputType = {
    alert_id: number
    headline: number
    short_description: number
    guid: number
    published_to: number
    _all: number
  }


  export type Alert_historyAvgAggregateInputType = {
    alert_id?: true
    published_to?: true
  }

  export type Alert_historySumAggregateInputType = {
    alert_id?: true
    published_to?: true
  }

  export type Alert_historyMinAggregateInputType = {
    alert_id?: true
    headline?: true
    short_description?: true
    guid?: true
    published_to?: true
  }

  export type Alert_historyMaxAggregateInputType = {
    alert_id?: true
    headline?: true
    short_description?: true
    guid?: true
    published_to?: true
  }

  export type Alert_historyCountAggregateInputType = {
    alert_id?: true
    headline?: true
    short_description?: true
    guid?: true
    published_to?: true
    _all?: true
  }

  export type Alert_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alert_history to aggregate.
     */
    where?: alert_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_histories to fetch.
     */
    orderBy?: alert_historyOrderByWithRelationInput | alert_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: alert_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned alert_histories
    **/
    _count?: true | Alert_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Alert_historyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Alert_historySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Alert_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Alert_historyMaxAggregateInputType
  }

  export type GetAlert_historyAggregateType<T extends Alert_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert_history[P]>
      : GetScalarType<T[P], AggregateAlert_history[P]>
  }




  export type alert_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: alert_historyWhereInput
    orderBy?: alert_historyOrderByWithAggregationInput | alert_historyOrderByWithAggregationInput[]
    by: Alert_historyScalarFieldEnum[] | Alert_historyScalarFieldEnum
    having?: alert_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Alert_historyCountAggregateInputType | true
    _avg?: Alert_historyAvgAggregateInputType
    _sum?: Alert_historySumAggregateInputType
    _min?: Alert_historyMinAggregateInputType
    _max?: Alert_historyMaxAggregateInputType
  }

  export type Alert_historyGroupByOutputType = {
    alert_id: number
    headline: string | null
    short_description: string | null
    guid: string | null
    published_to: number | null
    _count: Alert_historyCountAggregateOutputType | null
    _avg: Alert_historyAvgAggregateOutputType | null
    _sum: Alert_historySumAggregateOutputType | null
    _min: Alert_historyMinAggregateOutputType | null
    _max: Alert_historyMaxAggregateOutputType | null
  }

  type GetAlert_historyGroupByPayload<T extends alert_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Alert_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Alert_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Alert_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Alert_historyGroupByOutputType[P]>
        }
      >
    >


  export type alert_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    alert_id?: boolean
    headline?: boolean
    short_description?: boolean
    guid?: boolean
    published_to?: boolean
  }, ExtArgs["result"]["alert_history"]>

  export type alert_historySelectScalar = {
    alert_id?: boolean
    headline?: boolean
    short_description?: boolean
    guid?: boolean
    published_to?: boolean
  }


  export type $alert_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "alert_history"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      alert_id: number
      headline: string | null
      short_description: string | null
      guid: string | null
      published_to: number | null
    }, ExtArgs["result"]["alert_history"]>
    composites: {}
  }


  type alert_historyGetPayload<S extends boolean | null | undefined | alert_historyDefaultArgs> = $Result.GetResult<Prisma.$alert_historyPayload, S>

  type alert_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<alert_historyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Alert_historyCountAggregateInputType | true
    }

  export interface alert_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['alert_history'], meta: { name: 'alert_history' } }
    /**
     * Find zero or one Alert_history that matches the filter.
     * @param {alert_historyFindUniqueArgs} args - Arguments to find a Alert_history
     * @example
     * // Get one Alert_history
     * const alert_history = await prisma.alert_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends alert_historyFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, alert_historyFindUniqueArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Alert_history that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {alert_historyFindUniqueOrThrowArgs} args - Arguments to find a Alert_history
     * @example
     * // Get one Alert_history
     * const alert_history = await prisma.alert_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends alert_historyFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, alert_historyFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Alert_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_historyFindFirstArgs} args - Arguments to find a Alert_history
     * @example
     * // Get one Alert_history
     * const alert_history = await prisma.alert_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends alert_historyFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, alert_historyFindFirstArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Alert_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_historyFindFirstOrThrowArgs} args - Arguments to find a Alert_history
     * @example
     * // Get one Alert_history
     * const alert_history = await prisma.alert_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends alert_historyFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, alert_historyFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Alert_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_historyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alert_histories
     * const alert_histories = await prisma.alert_history.findMany()
     * 
     * // Get first 10 Alert_histories
     * const alert_histories = await prisma.alert_history.findMany({ take: 10 })
     * 
     * // Only select the `alert_id`
     * const alert_historyWithAlert_idOnly = await prisma.alert_history.findMany({ select: { alert_id: true } })
     * 
    **/
    findMany<T extends alert_historyFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, alert_historyFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Alert_history.
     * @param {alert_historyCreateArgs} args - Arguments to create a Alert_history.
     * @example
     * // Create one Alert_history
     * const Alert_history = await prisma.alert_history.create({
     *   data: {
     *     // ... data to create a Alert_history
     *   }
     * })
     * 
    **/
    create<T extends alert_historyCreateArgs<ExtArgs>>(
      args: SelectSubset<T, alert_historyCreateArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Alert_histories.
     *     @param {alert_historyCreateManyArgs} args - Arguments to create many Alert_histories.
     *     @example
     *     // Create many Alert_histories
     *     const alert_history = await prisma.alert_history.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends alert_historyCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, alert_historyCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Alert_history.
     * @param {alert_historyDeleteArgs} args - Arguments to delete one Alert_history.
     * @example
     * // Delete one Alert_history
     * const Alert_history = await prisma.alert_history.delete({
     *   where: {
     *     // ... filter to delete one Alert_history
     *   }
     * })
     * 
    **/
    delete<T extends alert_historyDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, alert_historyDeleteArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Alert_history.
     * @param {alert_historyUpdateArgs} args - Arguments to update one Alert_history.
     * @example
     * // Update one Alert_history
     * const alert_history = await prisma.alert_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends alert_historyUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, alert_historyUpdateArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Alert_histories.
     * @param {alert_historyDeleteManyArgs} args - Arguments to filter Alert_histories to delete.
     * @example
     * // Delete a few Alert_histories
     * const { count } = await prisma.alert_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends alert_historyDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, alert_historyDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alert_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alert_histories
     * const alert_history = await prisma.alert_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends alert_historyUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, alert_historyUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert_history.
     * @param {alert_historyUpsertArgs} args - Arguments to update or create a Alert_history.
     * @example
     * // Update or create a Alert_history
     * const alert_history = await prisma.alert_history.upsert({
     *   create: {
     *     // ... data to create a Alert_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert_history we want to update
     *   }
     * })
    **/
    upsert<T extends alert_historyUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, alert_historyUpsertArgs<ExtArgs>>
    ): Prisma__alert_historyClient<$Result.GetResult<Prisma.$alert_historyPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Alert_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_historyCountArgs} args - Arguments to filter Alert_histories to count.
     * @example
     * // Count the number of Alert_histories
     * const count = await prisma.alert_history.count({
     *   where: {
     *     // ... the filter for the Alert_histories we want to count
     *   }
     * })
    **/
    count<T extends alert_historyCountArgs>(
      args?: Subset<T, alert_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Alert_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Alert_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Alert_historyAggregateArgs>(args: Subset<T, Alert_historyAggregateArgs>): Prisma.PrismaPromise<GetAlert_historyAggregateType<T>>

    /**
     * Group by Alert_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alert_historyGroupByArgs} args - Group by arguments.
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
      T extends alert_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: alert_historyGroupByArgs['orderBy'] }
        : { orderBy?: alert_historyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, alert_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlert_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the alert_history model
   */
  readonly fields: alert_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for alert_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__alert_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the alert_history model
   */ 
  interface alert_historyFieldRefs {
    readonly alert_id: FieldRef<"alert_history", 'Int'>
    readonly headline: FieldRef<"alert_history", 'String'>
    readonly short_description: FieldRef<"alert_history", 'String'>
    readonly guid: FieldRef<"alert_history", 'String'>
    readonly published_to: FieldRef<"alert_history", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * alert_history findUnique
   */
  export type alert_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * Filter, which alert_history to fetch.
     */
    where: alert_historyWhereUniqueInput
  }


  /**
   * alert_history findUniqueOrThrow
   */
  export type alert_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * Filter, which alert_history to fetch.
     */
    where: alert_historyWhereUniqueInput
  }


  /**
   * alert_history findFirst
   */
  export type alert_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * Filter, which alert_history to fetch.
     */
    where?: alert_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_histories to fetch.
     */
    orderBy?: alert_historyOrderByWithRelationInput | alert_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alert_histories.
     */
    cursor?: alert_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alert_histories.
     */
    distinct?: Alert_historyScalarFieldEnum | Alert_historyScalarFieldEnum[]
  }


  /**
   * alert_history findFirstOrThrow
   */
  export type alert_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * Filter, which alert_history to fetch.
     */
    where?: alert_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_histories to fetch.
     */
    orderBy?: alert_historyOrderByWithRelationInput | alert_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alert_histories.
     */
    cursor?: alert_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alert_histories.
     */
    distinct?: Alert_historyScalarFieldEnum | Alert_historyScalarFieldEnum[]
  }


  /**
   * alert_history findMany
   */
  export type alert_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * Filter, which alert_histories to fetch.
     */
    where?: alert_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alert_histories to fetch.
     */
    orderBy?: alert_historyOrderByWithRelationInput | alert_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing alert_histories.
     */
    cursor?: alert_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alert_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alert_histories.
     */
    skip?: number
    distinct?: Alert_historyScalarFieldEnum | Alert_historyScalarFieldEnum[]
  }


  /**
   * alert_history create
   */
  export type alert_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * The data needed to create a alert_history.
     */
    data: XOR<alert_historyCreateInput, alert_historyUncheckedCreateInput>
  }


  /**
   * alert_history createMany
   */
  export type alert_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many alert_histories.
     */
    data: alert_historyCreateManyInput | alert_historyCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * alert_history update
   */
  export type alert_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * The data needed to update a alert_history.
     */
    data: XOR<alert_historyUpdateInput, alert_historyUncheckedUpdateInput>
    /**
     * Choose, which alert_history to update.
     */
    where: alert_historyWhereUniqueInput
  }


  /**
   * alert_history updateMany
   */
  export type alert_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update alert_histories.
     */
    data: XOR<alert_historyUpdateManyMutationInput, alert_historyUncheckedUpdateManyInput>
    /**
     * Filter which alert_histories to update
     */
    where?: alert_historyWhereInput
  }


  /**
   * alert_history upsert
   */
  export type alert_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * The filter to search for the alert_history to update in case it exists.
     */
    where: alert_historyWhereUniqueInput
    /**
     * In case the alert_history found by the `where` argument doesn't exist, create a new alert_history with this data.
     */
    create: XOR<alert_historyCreateInput, alert_historyUncheckedCreateInput>
    /**
     * In case the alert_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<alert_historyUpdateInput, alert_historyUncheckedUpdateInput>
  }


  /**
   * alert_history delete
   */
  export type alert_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
    /**
     * Filter which alert_history to delete.
     */
    where: alert_historyWhereUniqueInput
  }


  /**
   * alert_history deleteMany
   */
  export type alert_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which alert_histories to delete
     */
    where?: alert_historyWhereInput
  }


  /**
   * alert_history without action
   */
  export type alert_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the alert_history
     */
    select?: alert_historySelect<ExtArgs> | null
  }



  /**
   * Model guilds
   */

  export type AggregateGuilds = {
    _count: GuildsCountAggregateOutputType | null
    _avg: GuildsAvgAggregateOutputType | null
    _sum: GuildsSumAggregateOutputType | null
    _min: GuildsMinAggregateOutputType | null
    _max: GuildsMaxAggregateOutputType | null
  }

  export type GuildsAvgAggregateOutputType = {
    guild_id: number | null
    alert_channel: number | null
  }

  export type GuildsSumAggregateOutputType = {
    guild_id: bigint | null
    alert_channel: bigint | null
  }

  export type GuildsMinAggregateOutputType = {
    guild_id: bigint | null
    guild_name: string | null
    has_alerts: boolean | null
    alert_channel: bigint | null
    accessibility_alerts: boolean | null
    planned_alerts: boolean | null
  }

  export type GuildsMaxAggregateOutputType = {
    guild_id: bigint | null
    guild_name: string | null
    has_alerts: boolean | null
    alert_channel: bigint | null
    accessibility_alerts: boolean | null
    planned_alerts: boolean | null
  }

  export type GuildsCountAggregateOutputType = {
    guild_id: number
    guild_name: number
    has_alerts: number
    alert_channel: number
    accessibility_alerts: number
    planned_alerts: number
    route_ids: number
    _all: number
  }


  export type GuildsAvgAggregateInputType = {
    guild_id?: true
    alert_channel?: true
  }

  export type GuildsSumAggregateInputType = {
    guild_id?: true
    alert_channel?: true
  }

  export type GuildsMinAggregateInputType = {
    guild_id?: true
    guild_name?: true
    has_alerts?: true
    alert_channel?: true
    accessibility_alerts?: true
    planned_alerts?: true
  }

  export type GuildsMaxAggregateInputType = {
    guild_id?: true
    guild_name?: true
    has_alerts?: true
    alert_channel?: true
    accessibility_alerts?: true
    planned_alerts?: true
  }

  export type GuildsCountAggregateInputType = {
    guild_id?: true
    guild_name?: true
    has_alerts?: true
    alert_channel?: true
    accessibility_alerts?: true
    planned_alerts?: true
    route_ids?: true
    _all?: true
  }

  export type GuildsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guilds to aggregate.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned guilds
    **/
    _count?: true | GuildsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuildsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuildsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildsMaxAggregateInputType
  }

  export type GetGuildsAggregateType<T extends GuildsAggregateArgs> = {
        [P in keyof T & keyof AggregateGuilds]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuilds[P]>
      : GetScalarType<T[P], AggregateGuilds[P]>
  }




  export type guildsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: guildsWhereInput
    orderBy?: guildsOrderByWithAggregationInput | guildsOrderByWithAggregationInput[]
    by: GuildsScalarFieldEnum[] | GuildsScalarFieldEnum
    having?: guildsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildsCountAggregateInputType | true
    _avg?: GuildsAvgAggregateInputType
    _sum?: GuildsSumAggregateInputType
    _min?: GuildsMinAggregateInputType
    _max?: GuildsMaxAggregateInputType
  }

  export type GuildsGroupByOutputType = {
    guild_id: bigint
    guild_name: string | null
    has_alerts: boolean | null
    alert_channel: bigint | null
    accessibility_alerts: boolean | null
    planned_alerts: boolean | null
    route_ids: string[]
    _count: GuildsCountAggregateOutputType | null
    _avg: GuildsAvgAggregateOutputType | null
    _sum: GuildsSumAggregateOutputType | null
    _min: GuildsMinAggregateOutputType | null
    _max: GuildsMaxAggregateOutputType | null
  }

  type GetGuildsGroupByPayload<T extends guildsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildsGroupByOutputType[P]>
            : GetScalarType<T[P], GuildsGroupByOutputType[P]>
        }
      >
    >


  export type guildsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guild_id?: boolean
    guild_name?: boolean
    has_alerts?: boolean
    alert_channel?: boolean
    accessibility_alerts?: boolean
    planned_alerts?: boolean
    route_ids?: boolean
  }, ExtArgs["result"]["guilds"]>

  export type guildsSelectScalar = {
    guild_id?: boolean
    guild_name?: boolean
    has_alerts?: boolean
    alert_channel?: boolean
    accessibility_alerts?: boolean
    planned_alerts?: boolean
    route_ids?: boolean
  }


  export type $guildsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "guilds"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      guild_id: bigint
      guild_name: string | null
      has_alerts: boolean | null
      alert_channel: bigint | null
      accessibility_alerts: boolean | null
      planned_alerts: boolean | null
      route_ids: string[]
    }, ExtArgs["result"]["guilds"]>
    composites: {}
  }


  type guildsGetPayload<S extends boolean | null | undefined | guildsDefaultArgs> = $Result.GetResult<Prisma.$guildsPayload, S>

  type guildsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<guildsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GuildsCountAggregateInputType | true
    }

  export interface guildsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['guilds'], meta: { name: 'guilds' } }
    /**
     * Find zero or one Guilds that matches the filter.
     * @param {guildsFindUniqueArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends guildsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, guildsFindUniqueArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Guilds that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {guildsFindUniqueOrThrowArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends guildsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, guildsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Guilds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsFindFirstArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends guildsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, guildsFindFirstArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Guilds that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsFindFirstOrThrowArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends guildsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, guildsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Guilds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guilds
     * const guilds = await prisma.guilds.findMany()
     * 
     * // Get first 10 Guilds
     * const guilds = await prisma.guilds.findMany({ take: 10 })
     * 
     * // Only select the `guild_id`
     * const guildsWithGuild_idOnly = await prisma.guilds.findMany({ select: { guild_id: true } })
     * 
    **/
    findMany<T extends guildsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, guildsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Guilds.
     * @param {guildsCreateArgs} args - Arguments to create a Guilds.
     * @example
     * // Create one Guilds
     * const Guilds = await prisma.guilds.create({
     *   data: {
     *     // ... data to create a Guilds
     *   }
     * })
     * 
    **/
    create<T extends guildsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, guildsCreateArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Guilds.
     *     @param {guildsCreateManyArgs} args - Arguments to create many Guilds.
     *     @example
     *     // Create many Guilds
     *     const guilds = await prisma.guilds.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends guildsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, guildsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Guilds.
     * @param {guildsDeleteArgs} args - Arguments to delete one Guilds.
     * @example
     * // Delete one Guilds
     * const Guilds = await prisma.guilds.delete({
     *   where: {
     *     // ... filter to delete one Guilds
     *   }
     * })
     * 
    **/
    delete<T extends guildsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, guildsDeleteArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Guilds.
     * @param {guildsUpdateArgs} args - Arguments to update one Guilds.
     * @example
     * // Update one Guilds
     * const guilds = await prisma.guilds.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends guildsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, guildsUpdateArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Guilds.
     * @param {guildsDeleteManyArgs} args - Arguments to filter Guilds to delete.
     * @example
     * // Delete a few Guilds
     * const { count } = await prisma.guilds.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends guildsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, guildsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guilds
     * const guilds = await prisma.guilds.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends guildsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, guildsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Guilds.
     * @param {guildsUpsertArgs} args - Arguments to update or create a Guilds.
     * @example
     * // Update or create a Guilds
     * const guilds = await prisma.guilds.upsert({
     *   create: {
     *     // ... data to create a Guilds
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guilds we want to update
     *   }
     * })
    **/
    upsert<T extends guildsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, guildsUpsertArgs<ExtArgs>>
    ): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsCountArgs} args - Arguments to filter Guilds to count.
     * @example
     * // Count the number of Guilds
     * const count = await prisma.guilds.count({
     *   where: {
     *     // ... the filter for the Guilds we want to count
     *   }
     * })
    **/
    count<T extends guildsCountArgs>(
      args?: Subset<T, guildsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GuildsAggregateArgs>(args: Subset<T, GuildsAggregateArgs>): Prisma.PrismaPromise<GetGuildsAggregateType<T>>

    /**
     * Group by Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsGroupByArgs} args - Group by arguments.
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
      T extends guildsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: guildsGroupByArgs['orderBy'] }
        : { orderBy?: guildsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, guildsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the guilds model
   */
  readonly fields: guildsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for guilds.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__guildsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the guilds model
   */ 
  interface guildsFieldRefs {
    readonly guild_id: FieldRef<"guilds", 'BigInt'>
    readonly guild_name: FieldRef<"guilds", 'String'>
    readonly has_alerts: FieldRef<"guilds", 'Boolean'>
    readonly alert_channel: FieldRef<"guilds", 'BigInt'>
    readonly accessibility_alerts: FieldRef<"guilds", 'Boolean'>
    readonly planned_alerts: FieldRef<"guilds", 'Boolean'>
    readonly route_ids: FieldRef<"guilds", 'String[]'>
  }
    

  // Custom InputTypes

  /**
   * guilds findUnique
   */
  export type guildsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where: guildsWhereUniqueInput
  }


  /**
   * guilds findUniqueOrThrow
   */
  export type guildsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where: guildsWhereUniqueInput
  }


  /**
   * guilds findFirst
   */
  export type guildsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guilds.
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guilds.
     */
    distinct?: GuildsScalarFieldEnum | GuildsScalarFieldEnum[]
  }


  /**
   * guilds findFirstOrThrow
   */
  export type guildsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guilds.
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guilds.
     */
    distinct?: GuildsScalarFieldEnum | GuildsScalarFieldEnum[]
  }


  /**
   * guilds findMany
   */
  export type guildsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing guilds.
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    distinct?: GuildsScalarFieldEnum | GuildsScalarFieldEnum[]
  }


  /**
   * guilds create
   */
  export type guildsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * The data needed to create a guilds.
     */
    data: XOR<guildsCreateInput, guildsUncheckedCreateInput>
  }


  /**
   * guilds createMany
   */
  export type guildsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many guilds.
     */
    data: guildsCreateManyInput | guildsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * guilds update
   */
  export type guildsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * The data needed to update a guilds.
     */
    data: XOR<guildsUpdateInput, guildsUncheckedUpdateInput>
    /**
     * Choose, which guilds to update.
     */
    where: guildsWhereUniqueInput
  }


  /**
   * guilds updateMany
   */
  export type guildsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update guilds.
     */
    data: XOR<guildsUpdateManyMutationInput, guildsUncheckedUpdateManyInput>
    /**
     * Filter which guilds to update
     */
    where?: guildsWhereInput
  }


  /**
   * guilds upsert
   */
  export type guildsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * The filter to search for the guilds to update in case it exists.
     */
    where: guildsWhereUniqueInput
    /**
     * In case the guilds found by the `where` argument doesn't exist, create a new guilds with this data.
     */
    create: XOR<guildsCreateInput, guildsUncheckedCreateInput>
    /**
     * In case the guilds was found with the provided `where` argument, update it with this data.
     */
    update: XOR<guildsUpdateInput, guildsUncheckedUpdateInput>
  }


  /**
   * guilds delete
   */
  export type guildsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Filter which guilds to delete.
     */
    where: guildsWhereUniqueInput
  }


  /**
   * guilds deleteMany
   */
  export type guildsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guilds to delete
     */
    where?: guildsWhereInput
  }


  /**
   * guilds without action
   */
  export type guildsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
  }



  /**
   * Model kv_store
   */

  export type AggregateKv_store = {
    _count: Kv_storeCountAggregateOutputType | null
    _min: Kv_storeMinAggregateOutputType | null
    _max: Kv_storeMaxAggregateOutputType | null
  }

  export type Kv_storeMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type Kv_storeMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type Kv_storeCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type Kv_storeMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type Kv_storeMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type Kv_storeCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type Kv_storeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which kv_store to aggregate.
     */
    where?: kv_storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kv_stores to fetch.
     */
    orderBy?: kv_storeOrderByWithRelationInput | kv_storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: kv_storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kv_stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kv_stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned kv_stores
    **/
    _count?: true | Kv_storeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Kv_storeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Kv_storeMaxAggregateInputType
  }

  export type GetKv_storeAggregateType<T extends Kv_storeAggregateArgs> = {
        [P in keyof T & keyof AggregateKv_store]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKv_store[P]>
      : GetScalarType<T[P], AggregateKv_store[P]>
  }




  export type kv_storeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: kv_storeWhereInput
    orderBy?: kv_storeOrderByWithAggregationInput | kv_storeOrderByWithAggregationInput[]
    by: Kv_storeScalarFieldEnum[] | Kv_storeScalarFieldEnum
    having?: kv_storeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Kv_storeCountAggregateInputType | true
    _min?: Kv_storeMinAggregateInputType
    _max?: Kv_storeMaxAggregateInputType
  }

  export type Kv_storeGroupByOutputType = {
    key: string
    value: string | null
    _count: Kv_storeCountAggregateOutputType | null
    _min: Kv_storeMinAggregateOutputType | null
    _max: Kv_storeMaxAggregateOutputType | null
  }

  type GetKv_storeGroupByPayload<T extends kv_storeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Kv_storeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Kv_storeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Kv_storeGroupByOutputType[P]>
            : GetScalarType<T[P], Kv_storeGroupByOutputType[P]>
        }
      >
    >


  export type kv_storeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["kv_store"]>

  export type kv_storeSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $kv_storePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "kv_store"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string | null
    }, ExtArgs["result"]["kv_store"]>
    composites: {}
  }


  type kv_storeGetPayload<S extends boolean | null | undefined | kv_storeDefaultArgs> = $Result.GetResult<Prisma.$kv_storePayload, S>

  type kv_storeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<kv_storeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Kv_storeCountAggregateInputType | true
    }

  export interface kv_storeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['kv_store'], meta: { name: 'kv_store' } }
    /**
     * Find zero or one Kv_store that matches the filter.
     * @param {kv_storeFindUniqueArgs} args - Arguments to find a Kv_store
     * @example
     * // Get one Kv_store
     * const kv_store = await prisma.kv_store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends kv_storeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, kv_storeFindUniqueArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Kv_store that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {kv_storeFindUniqueOrThrowArgs} args - Arguments to find a Kv_store
     * @example
     * // Get one Kv_store
     * const kv_store = await prisma.kv_store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends kv_storeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, kv_storeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Kv_store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kv_storeFindFirstArgs} args - Arguments to find a Kv_store
     * @example
     * // Get one Kv_store
     * const kv_store = await prisma.kv_store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends kv_storeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, kv_storeFindFirstArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Kv_store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kv_storeFindFirstOrThrowArgs} args - Arguments to find a Kv_store
     * @example
     * // Get one Kv_store
     * const kv_store = await prisma.kv_store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends kv_storeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, kv_storeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Kv_stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kv_storeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kv_stores
     * const kv_stores = await prisma.kv_store.findMany()
     * 
     * // Get first 10 Kv_stores
     * const kv_stores = await prisma.kv_store.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const kv_storeWithKeyOnly = await prisma.kv_store.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends kv_storeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, kv_storeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Kv_store.
     * @param {kv_storeCreateArgs} args - Arguments to create a Kv_store.
     * @example
     * // Create one Kv_store
     * const Kv_store = await prisma.kv_store.create({
     *   data: {
     *     // ... data to create a Kv_store
     *   }
     * })
     * 
    **/
    create<T extends kv_storeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, kv_storeCreateArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Kv_stores.
     *     @param {kv_storeCreateManyArgs} args - Arguments to create many Kv_stores.
     *     @example
     *     // Create many Kv_stores
     *     const kv_store = await prisma.kv_store.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends kv_storeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, kv_storeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Kv_store.
     * @param {kv_storeDeleteArgs} args - Arguments to delete one Kv_store.
     * @example
     * // Delete one Kv_store
     * const Kv_store = await prisma.kv_store.delete({
     *   where: {
     *     // ... filter to delete one Kv_store
     *   }
     * })
     * 
    **/
    delete<T extends kv_storeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, kv_storeDeleteArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Kv_store.
     * @param {kv_storeUpdateArgs} args - Arguments to update one Kv_store.
     * @example
     * // Update one Kv_store
     * const kv_store = await prisma.kv_store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends kv_storeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, kv_storeUpdateArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Kv_stores.
     * @param {kv_storeDeleteManyArgs} args - Arguments to filter Kv_stores to delete.
     * @example
     * // Delete a few Kv_stores
     * const { count } = await prisma.kv_store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends kv_storeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, kv_storeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kv_stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kv_storeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kv_stores
     * const kv_store = await prisma.kv_store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends kv_storeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, kv_storeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Kv_store.
     * @param {kv_storeUpsertArgs} args - Arguments to update or create a Kv_store.
     * @example
     * // Update or create a Kv_store
     * const kv_store = await prisma.kv_store.upsert({
     *   create: {
     *     // ... data to create a Kv_store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kv_store we want to update
     *   }
     * })
    **/
    upsert<T extends kv_storeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, kv_storeUpsertArgs<ExtArgs>>
    ): Prisma__kv_storeClient<$Result.GetResult<Prisma.$kv_storePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Kv_stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kv_storeCountArgs} args - Arguments to filter Kv_stores to count.
     * @example
     * // Count the number of Kv_stores
     * const count = await prisma.kv_store.count({
     *   where: {
     *     // ... the filter for the Kv_stores we want to count
     *   }
     * })
    **/
    count<T extends kv_storeCountArgs>(
      args?: Subset<T, kv_storeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Kv_storeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kv_store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Kv_storeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Kv_storeAggregateArgs>(args: Subset<T, Kv_storeAggregateArgs>): Prisma.PrismaPromise<GetKv_storeAggregateType<T>>

    /**
     * Group by Kv_store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kv_storeGroupByArgs} args - Group by arguments.
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
      T extends kv_storeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: kv_storeGroupByArgs['orderBy'] }
        : { orderBy?: kv_storeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, kv_storeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKv_storeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the kv_store model
   */
  readonly fields: kv_storeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for kv_store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__kv_storeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the kv_store model
   */ 
  interface kv_storeFieldRefs {
    readonly key: FieldRef<"kv_store", 'String'>
    readonly value: FieldRef<"kv_store", 'String'>
  }
    

  // Custom InputTypes

  /**
   * kv_store findUnique
   */
  export type kv_storeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * Filter, which kv_store to fetch.
     */
    where: kv_storeWhereUniqueInput
  }


  /**
   * kv_store findUniqueOrThrow
   */
  export type kv_storeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * Filter, which kv_store to fetch.
     */
    where: kv_storeWhereUniqueInput
  }


  /**
   * kv_store findFirst
   */
  export type kv_storeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * Filter, which kv_store to fetch.
     */
    where?: kv_storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kv_stores to fetch.
     */
    orderBy?: kv_storeOrderByWithRelationInput | kv_storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for kv_stores.
     */
    cursor?: kv_storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kv_stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kv_stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of kv_stores.
     */
    distinct?: Kv_storeScalarFieldEnum | Kv_storeScalarFieldEnum[]
  }


  /**
   * kv_store findFirstOrThrow
   */
  export type kv_storeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * Filter, which kv_store to fetch.
     */
    where?: kv_storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kv_stores to fetch.
     */
    orderBy?: kv_storeOrderByWithRelationInput | kv_storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for kv_stores.
     */
    cursor?: kv_storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kv_stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kv_stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of kv_stores.
     */
    distinct?: Kv_storeScalarFieldEnum | Kv_storeScalarFieldEnum[]
  }


  /**
   * kv_store findMany
   */
  export type kv_storeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * Filter, which kv_stores to fetch.
     */
    where?: kv_storeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kv_stores to fetch.
     */
    orderBy?: kv_storeOrderByWithRelationInput | kv_storeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing kv_stores.
     */
    cursor?: kv_storeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kv_stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kv_stores.
     */
    skip?: number
    distinct?: Kv_storeScalarFieldEnum | Kv_storeScalarFieldEnum[]
  }


  /**
   * kv_store create
   */
  export type kv_storeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * The data needed to create a kv_store.
     */
    data: XOR<kv_storeCreateInput, kv_storeUncheckedCreateInput>
  }


  /**
   * kv_store createMany
   */
  export type kv_storeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many kv_stores.
     */
    data: kv_storeCreateManyInput | kv_storeCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * kv_store update
   */
  export type kv_storeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * The data needed to update a kv_store.
     */
    data: XOR<kv_storeUpdateInput, kv_storeUncheckedUpdateInput>
    /**
     * Choose, which kv_store to update.
     */
    where: kv_storeWhereUniqueInput
  }


  /**
   * kv_store updateMany
   */
  export type kv_storeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update kv_stores.
     */
    data: XOR<kv_storeUpdateManyMutationInput, kv_storeUncheckedUpdateManyInput>
    /**
     * Filter which kv_stores to update
     */
    where?: kv_storeWhereInput
  }


  /**
   * kv_store upsert
   */
  export type kv_storeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * The filter to search for the kv_store to update in case it exists.
     */
    where: kv_storeWhereUniqueInput
    /**
     * In case the kv_store found by the `where` argument doesn't exist, create a new kv_store with this data.
     */
    create: XOR<kv_storeCreateInput, kv_storeUncheckedCreateInput>
    /**
     * In case the kv_store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<kv_storeUpdateInput, kv_storeUncheckedUpdateInput>
  }


  /**
   * kv_store delete
   */
  export type kv_storeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
    /**
     * Filter which kv_store to delete.
     */
    where: kv_storeWhereUniqueInput
  }


  /**
   * kv_store deleteMany
   */
  export type kv_storeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which kv_stores to delete
     */
    where?: kv_storeWhereInput
  }


  /**
   * kv_store without action
   */
  export type kv_storeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the kv_store
     */
    select?: kv_storeSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Alert_historyScalarFieldEnum: {
    alert_id: 'alert_id',
    headline: 'headline',
    short_description: 'short_description',
    guid: 'guid',
    published_to: 'published_to'
  };

  export type Alert_historyScalarFieldEnum = (typeof Alert_historyScalarFieldEnum)[keyof typeof Alert_historyScalarFieldEnum]


  export const GuildsScalarFieldEnum: {
    guild_id: 'guild_id',
    guild_name: 'guild_name',
    has_alerts: 'has_alerts',
    alert_channel: 'alert_channel',
    accessibility_alerts: 'accessibility_alerts',
    planned_alerts: 'planned_alerts',
    route_ids: 'route_ids'
  };

  export type GuildsScalarFieldEnum = (typeof GuildsScalarFieldEnum)[keyof typeof GuildsScalarFieldEnum]


  export const Kv_storeScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type Kv_storeScalarFieldEnum = (typeof Kv_storeScalarFieldEnum)[keyof typeof Kv_storeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type alert_historyWhereInput = {
    AND?: alert_historyWhereInput | alert_historyWhereInput[]
    OR?: alert_historyWhereInput[]
    NOT?: alert_historyWhereInput | alert_historyWhereInput[]
    alert_id?: IntFilter<"alert_history"> | number
    headline?: StringNullableFilter<"alert_history"> | string | null
    short_description?: StringNullableFilter<"alert_history"> | string | null
    guid?: StringNullableFilter<"alert_history"> | string | null
    published_to?: IntNullableFilter<"alert_history"> | number | null
  }

  export type alert_historyOrderByWithRelationInput = {
    alert_id?: SortOrder
    headline?: SortOrderInput | SortOrder
    short_description?: SortOrderInput | SortOrder
    guid?: SortOrderInput | SortOrder
    published_to?: SortOrderInput | SortOrder
  }

  export type alert_historyWhereUniqueInput = Prisma.AtLeast<{
    alert_id?: number
    AND?: alert_historyWhereInput | alert_historyWhereInput[]
    OR?: alert_historyWhereInput[]
    NOT?: alert_historyWhereInput | alert_historyWhereInput[]
    headline?: StringNullableFilter<"alert_history"> | string | null
    short_description?: StringNullableFilter<"alert_history"> | string | null
    guid?: StringNullableFilter<"alert_history"> | string | null
    published_to?: IntNullableFilter<"alert_history"> | number | null
  }, "alert_id">

  export type alert_historyOrderByWithAggregationInput = {
    alert_id?: SortOrder
    headline?: SortOrderInput | SortOrder
    short_description?: SortOrderInput | SortOrder
    guid?: SortOrderInput | SortOrder
    published_to?: SortOrderInput | SortOrder
    _count?: alert_historyCountOrderByAggregateInput
    _avg?: alert_historyAvgOrderByAggregateInput
    _max?: alert_historyMaxOrderByAggregateInput
    _min?: alert_historyMinOrderByAggregateInput
    _sum?: alert_historySumOrderByAggregateInput
  }

  export type alert_historyScalarWhereWithAggregatesInput = {
    AND?: alert_historyScalarWhereWithAggregatesInput | alert_historyScalarWhereWithAggregatesInput[]
    OR?: alert_historyScalarWhereWithAggregatesInput[]
    NOT?: alert_historyScalarWhereWithAggregatesInput | alert_historyScalarWhereWithAggregatesInput[]
    alert_id?: IntWithAggregatesFilter<"alert_history"> | number
    headline?: StringNullableWithAggregatesFilter<"alert_history"> | string | null
    short_description?: StringNullableWithAggregatesFilter<"alert_history"> | string | null
    guid?: StringNullableWithAggregatesFilter<"alert_history"> | string | null
    published_to?: IntNullableWithAggregatesFilter<"alert_history"> | number | null
  }

  export type guildsWhereInput = {
    AND?: guildsWhereInput | guildsWhereInput[]
    OR?: guildsWhereInput[]
    NOT?: guildsWhereInput | guildsWhereInput[]
    guild_id?: BigIntFilter<"guilds"> | bigint | number
    guild_name?: StringNullableFilter<"guilds"> | string | null
    has_alerts?: BoolNullableFilter<"guilds"> | boolean | null
    alert_channel?: BigIntNullableFilter<"guilds"> | bigint | number | null
    accessibility_alerts?: BoolNullableFilter<"guilds"> | boolean | null
    planned_alerts?: BoolNullableFilter<"guilds"> | boolean | null
    route_ids?: StringNullableListFilter<"guilds">
  }

  export type guildsOrderByWithRelationInput = {
    guild_id?: SortOrder
    guild_name?: SortOrderInput | SortOrder
    has_alerts?: SortOrderInput | SortOrder
    alert_channel?: SortOrderInput | SortOrder
    accessibility_alerts?: SortOrderInput | SortOrder
    planned_alerts?: SortOrderInput | SortOrder
    route_ids?: SortOrder
  }

  export type guildsWhereUniqueInput = Prisma.AtLeast<{
    guild_id?: bigint | number
    AND?: guildsWhereInput | guildsWhereInput[]
    OR?: guildsWhereInput[]
    NOT?: guildsWhereInput | guildsWhereInput[]
    guild_name?: StringNullableFilter<"guilds"> | string | null
    has_alerts?: BoolNullableFilter<"guilds"> | boolean | null
    alert_channel?: BigIntNullableFilter<"guilds"> | bigint | number | null
    accessibility_alerts?: BoolNullableFilter<"guilds"> | boolean | null
    planned_alerts?: BoolNullableFilter<"guilds"> | boolean | null
    route_ids?: StringNullableListFilter<"guilds">
  }, "guild_id">

  export type guildsOrderByWithAggregationInput = {
    guild_id?: SortOrder
    guild_name?: SortOrderInput | SortOrder
    has_alerts?: SortOrderInput | SortOrder
    alert_channel?: SortOrderInput | SortOrder
    accessibility_alerts?: SortOrderInput | SortOrder
    planned_alerts?: SortOrderInput | SortOrder
    route_ids?: SortOrder
    _count?: guildsCountOrderByAggregateInput
    _avg?: guildsAvgOrderByAggregateInput
    _max?: guildsMaxOrderByAggregateInput
    _min?: guildsMinOrderByAggregateInput
    _sum?: guildsSumOrderByAggregateInput
  }

  export type guildsScalarWhereWithAggregatesInput = {
    AND?: guildsScalarWhereWithAggregatesInput | guildsScalarWhereWithAggregatesInput[]
    OR?: guildsScalarWhereWithAggregatesInput[]
    NOT?: guildsScalarWhereWithAggregatesInput | guildsScalarWhereWithAggregatesInput[]
    guild_id?: BigIntWithAggregatesFilter<"guilds"> | bigint | number
    guild_name?: StringNullableWithAggregatesFilter<"guilds"> | string | null
    has_alerts?: BoolNullableWithAggregatesFilter<"guilds"> | boolean | null
    alert_channel?: BigIntNullableWithAggregatesFilter<"guilds"> | bigint | number | null
    accessibility_alerts?: BoolNullableWithAggregatesFilter<"guilds"> | boolean | null
    planned_alerts?: BoolNullableWithAggregatesFilter<"guilds"> | boolean | null
    route_ids?: StringNullableListFilter<"guilds">
  }

  export type kv_storeWhereInput = {
    AND?: kv_storeWhereInput | kv_storeWhereInput[]
    OR?: kv_storeWhereInput[]
    NOT?: kv_storeWhereInput | kv_storeWhereInput[]
    key?: StringFilter<"kv_store"> | string
    value?: StringNullableFilter<"kv_store"> | string | null
  }

  export type kv_storeOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrderInput | SortOrder
  }

  export type kv_storeWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: kv_storeWhereInput | kv_storeWhereInput[]
    OR?: kv_storeWhereInput[]
    NOT?: kv_storeWhereInput | kv_storeWhereInput[]
    value?: StringNullableFilter<"kv_store"> | string | null
  }, "key">

  export type kv_storeOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrderInput | SortOrder
    _count?: kv_storeCountOrderByAggregateInput
    _max?: kv_storeMaxOrderByAggregateInput
    _min?: kv_storeMinOrderByAggregateInput
  }

  export type kv_storeScalarWhereWithAggregatesInput = {
    AND?: kv_storeScalarWhereWithAggregatesInput | kv_storeScalarWhereWithAggregatesInput[]
    OR?: kv_storeScalarWhereWithAggregatesInput[]
    NOT?: kv_storeScalarWhereWithAggregatesInput | kv_storeScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"kv_store"> | string
    value?: StringNullableWithAggregatesFilter<"kv_store"> | string | null
  }

  export type alert_historyCreateInput = {
    alert_id: number
    headline?: string | null
    short_description?: string | null
    guid?: string | null
    published_to?: number | null
  }

  export type alert_historyUncheckedCreateInput = {
    alert_id: number
    headline?: string | null
    short_description?: string | null
    guid?: string | null
    published_to?: number | null
  }

  export type alert_historyUpdateInput = {
    alert_id?: IntFieldUpdateOperationsInput | number
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    guid?: NullableStringFieldUpdateOperationsInput | string | null
    published_to?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type alert_historyUncheckedUpdateInput = {
    alert_id?: IntFieldUpdateOperationsInput | number
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    guid?: NullableStringFieldUpdateOperationsInput | string | null
    published_to?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type alert_historyCreateManyInput = {
    alert_id: number
    headline?: string | null
    short_description?: string | null
    guid?: string | null
    published_to?: number | null
  }

  export type alert_historyUpdateManyMutationInput = {
    alert_id?: IntFieldUpdateOperationsInput | number
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    guid?: NullableStringFieldUpdateOperationsInput | string | null
    published_to?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type alert_historyUncheckedUpdateManyInput = {
    alert_id?: IntFieldUpdateOperationsInput | number
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    guid?: NullableStringFieldUpdateOperationsInput | string | null
    published_to?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type guildsCreateInput = {
    guild_id: bigint | number
    guild_name?: string | null
    has_alerts?: boolean | null
    alert_channel?: bigint | number | null
    accessibility_alerts?: boolean | null
    planned_alerts?: boolean | null
    route_ids?: guildsCreateroute_idsInput | string[]
  }

  export type guildsUncheckedCreateInput = {
    guild_id: bigint | number
    guild_name?: string | null
    has_alerts?: boolean | null
    alert_channel?: bigint | number | null
    accessibility_alerts?: boolean | null
    planned_alerts?: boolean | null
    route_ids?: guildsCreateroute_idsInput | string[]
  }

  export type guildsUpdateInput = {
    guild_id?: BigIntFieldUpdateOperationsInput | bigint | number
    guild_name?: NullableStringFieldUpdateOperationsInput | string | null
    has_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    alert_channel?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    accessibility_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    planned_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    route_ids?: guildsUpdateroute_idsInput | string[]
  }

  export type guildsUncheckedUpdateInput = {
    guild_id?: BigIntFieldUpdateOperationsInput | bigint | number
    guild_name?: NullableStringFieldUpdateOperationsInput | string | null
    has_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    alert_channel?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    accessibility_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    planned_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    route_ids?: guildsUpdateroute_idsInput | string[]
  }

  export type guildsCreateManyInput = {
    guild_id: bigint | number
    guild_name?: string | null
    has_alerts?: boolean | null
    alert_channel?: bigint | number | null
    accessibility_alerts?: boolean | null
    planned_alerts?: boolean | null
    route_ids?: guildsCreateroute_idsInput | string[]
  }

  export type guildsUpdateManyMutationInput = {
    guild_id?: BigIntFieldUpdateOperationsInput | bigint | number
    guild_name?: NullableStringFieldUpdateOperationsInput | string | null
    has_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    alert_channel?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    accessibility_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    planned_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    route_ids?: guildsUpdateroute_idsInput | string[]
  }

  export type guildsUncheckedUpdateManyInput = {
    guild_id?: BigIntFieldUpdateOperationsInput | bigint | number
    guild_name?: NullableStringFieldUpdateOperationsInput | string | null
    has_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    alert_channel?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    accessibility_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    planned_alerts?: NullableBoolFieldUpdateOperationsInput | boolean | null
    route_ids?: guildsUpdateroute_idsInput | string[]
  }

  export type kv_storeCreateInput = {
    key: string
    value?: string | null
  }

  export type kv_storeUncheckedCreateInput = {
    key: string
    value?: string | null
  }

  export type kv_storeUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type kv_storeUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type kv_storeCreateManyInput = {
    key: string
    value?: string | null
  }

  export type kv_storeUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type kv_storeUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type alert_historyCountOrderByAggregateInput = {
    alert_id?: SortOrder
    headline?: SortOrder
    short_description?: SortOrder
    guid?: SortOrder
    published_to?: SortOrder
  }

  export type alert_historyAvgOrderByAggregateInput = {
    alert_id?: SortOrder
    published_to?: SortOrder
  }

  export type alert_historyMaxOrderByAggregateInput = {
    alert_id?: SortOrder
    headline?: SortOrder
    short_description?: SortOrder
    guid?: SortOrder
    published_to?: SortOrder
  }

  export type alert_historyMinOrderByAggregateInput = {
    alert_id?: SortOrder
    headline?: SortOrder
    short_description?: SortOrder
    guid?: SortOrder
    published_to?: SortOrder
  }

  export type alert_historySumOrderByAggregateInput = {
    alert_id?: SortOrder
    published_to?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type guildsCountOrderByAggregateInput = {
    guild_id?: SortOrder
    guild_name?: SortOrder
    has_alerts?: SortOrder
    alert_channel?: SortOrder
    accessibility_alerts?: SortOrder
    planned_alerts?: SortOrder
    route_ids?: SortOrder
  }

  export type guildsAvgOrderByAggregateInput = {
    guild_id?: SortOrder
    alert_channel?: SortOrder
  }

  export type guildsMaxOrderByAggregateInput = {
    guild_id?: SortOrder
    guild_name?: SortOrder
    has_alerts?: SortOrder
    alert_channel?: SortOrder
    accessibility_alerts?: SortOrder
    planned_alerts?: SortOrder
  }

  export type guildsMinOrderByAggregateInput = {
    guild_id?: SortOrder
    guild_name?: SortOrder
    has_alerts?: SortOrder
    alert_channel?: SortOrder
    accessibility_alerts?: SortOrder
    planned_alerts?: SortOrder
  }

  export type guildsSumOrderByAggregateInput = {
    guild_id?: SortOrder
    alert_channel?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type kv_storeCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type kv_storeMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type kv_storeMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type guildsCreateroute_idsInput = {
    set: string[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type guildsUpdateroute_idsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use alert_historyDefaultArgs instead
     */
    export type alert_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = alert_historyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use guildsDefaultArgs instead
     */
    export type guildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = guildsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use kv_storeDefaultArgs instead
     */
    export type kv_storeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = kv_storeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}