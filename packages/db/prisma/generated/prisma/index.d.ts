
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Ngo
 * 
 */
export type Ngo = $Result.DefaultSelection<Prisma.$NgoPayload>
/**
 * Model ScrapeRun
 * 
 */
export type ScrapeRun = $Result.DefaultSelection<Prisma.$ScrapeRunPayload>
/**
 * Model Sector
 * 
 */
export type Sector = $Result.DefaultSelection<Prisma.$SectorPayload>
/**
 * Model NgoSector
 * 
 */
export type NgoSector = $Result.DefaultSelection<Prisma.$NgoSectorPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Ngos
 * const ngos = await prisma.ngo.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Ngos
   * const ngos = await prisma.ngo.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.ngo`: Exposes CRUD operations for the **Ngo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ngos
    * const ngos = await prisma.ngo.findMany()
    * ```
    */
  get ngo(): Prisma.NgoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scrapeRun`: Exposes CRUD operations for the **ScrapeRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScrapeRuns
    * const scrapeRuns = await prisma.scrapeRun.findMany()
    * ```
    */
  get scrapeRun(): Prisma.ScrapeRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sector`: Exposes CRUD operations for the **Sector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sectors
    * const sectors = await prisma.sector.findMany()
    * ```
    */
  get sector(): Prisma.SectorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ngoSector`: Exposes CRUD operations for the **NgoSector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NgoSectors
    * const ngoSectors = await prisma.ngoSector.findMany()
    * ```
    */
  get ngoSector(): Prisma.NgoSectorDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.1
   * Query Engine version: f09f2815f091dbba658cdcd2264306d88bb5bda6
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Ngo: 'Ngo',
    ScrapeRun: 'ScrapeRun',
    Sector: 'Sector',
    NgoSector: 'NgoSector'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "ngo" | "scrapeRun" | "sector" | "ngoSector"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Ngo: {
        payload: Prisma.$NgoPayload<ExtArgs>
        fields: Prisma.NgoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NgoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NgoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>
          }
          findFirst: {
            args: Prisma.NgoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NgoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>
          }
          findMany: {
            args: Prisma.NgoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>[]
          }
          create: {
            args: Prisma.NgoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>
          }
          createMany: {
            args: Prisma.NgoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NgoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>[]
          }
          delete: {
            args: Prisma.NgoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>
          }
          update: {
            args: Prisma.NgoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>
          }
          deleteMany: {
            args: Prisma.NgoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NgoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NgoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>[]
          }
          upsert: {
            args: Prisma.NgoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoPayload>
          }
          aggregate: {
            args: Prisma.NgoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNgo>
          }
          groupBy: {
            args: Prisma.NgoGroupByArgs<ExtArgs>
            result: $Utils.Optional<NgoGroupByOutputType>[]
          }
          count: {
            args: Prisma.NgoCountArgs<ExtArgs>
            result: $Utils.Optional<NgoCountAggregateOutputType> | number
          }
        }
      }
      ScrapeRun: {
        payload: Prisma.$ScrapeRunPayload<ExtArgs>
        fields: Prisma.ScrapeRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScrapeRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScrapeRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>
          }
          findFirst: {
            args: Prisma.ScrapeRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScrapeRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>
          }
          findMany: {
            args: Prisma.ScrapeRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>[]
          }
          create: {
            args: Prisma.ScrapeRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>
          }
          createMany: {
            args: Prisma.ScrapeRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScrapeRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>[]
          }
          delete: {
            args: Prisma.ScrapeRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>
          }
          update: {
            args: Prisma.ScrapeRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>
          }
          deleteMany: {
            args: Prisma.ScrapeRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScrapeRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScrapeRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>[]
          }
          upsert: {
            args: Prisma.ScrapeRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScrapeRunPayload>
          }
          aggregate: {
            args: Prisma.ScrapeRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScrapeRun>
          }
          groupBy: {
            args: Prisma.ScrapeRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScrapeRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScrapeRunCountArgs<ExtArgs>
            result: $Utils.Optional<ScrapeRunCountAggregateOutputType> | number
          }
        }
      }
      Sector: {
        payload: Prisma.$SectorPayload<ExtArgs>
        fields: Prisma.SectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          findFirst: {
            args: Prisma.SectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          findMany: {
            args: Prisma.SectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>[]
          }
          create: {
            args: Prisma.SectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          createMany: {
            args: Prisma.SectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>[]
          }
          delete: {
            args: Prisma.SectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          update: {
            args: Prisma.SectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          deleteMany: {
            args: Prisma.SectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SectorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>[]
          }
          upsert: {
            args: Prisma.SectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectorPayload>
          }
          aggregate: {
            args: Prisma.SectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSector>
          }
          groupBy: {
            args: Prisma.SectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectorCountArgs<ExtArgs>
            result: $Utils.Optional<SectorCountAggregateOutputType> | number
          }
        }
      }
      NgoSector: {
        payload: Prisma.$NgoSectorPayload<ExtArgs>
        fields: Prisma.NgoSectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NgoSectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NgoSectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>
          }
          findFirst: {
            args: Prisma.NgoSectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NgoSectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>
          }
          findMany: {
            args: Prisma.NgoSectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>[]
          }
          create: {
            args: Prisma.NgoSectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>
          }
          createMany: {
            args: Prisma.NgoSectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NgoSectorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>[]
          }
          delete: {
            args: Prisma.NgoSectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>
          }
          update: {
            args: Prisma.NgoSectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>
          }
          deleteMany: {
            args: Prisma.NgoSectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NgoSectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NgoSectorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>[]
          }
          upsert: {
            args: Prisma.NgoSectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NgoSectorPayload>
          }
          aggregate: {
            args: Prisma.NgoSectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNgoSector>
          }
          groupBy: {
            args: Prisma.NgoSectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<NgoSectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.NgoSectorCountArgs<ExtArgs>
            result: $Utils.Optional<NgoSectorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    ngo?: NgoOmit
    scrapeRun?: ScrapeRunOmit
    sector?: SectorOmit
    ngoSector?: NgoSectorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
   * Count Type NgoCountOutputType
   */

  export type NgoCountOutputType = {
    sectors: number
  }

  export type NgoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sectors?: boolean | NgoCountOutputTypeCountSectorsArgs
  }

  // Custom InputTypes
  /**
   * NgoCountOutputType without action
   */
  export type NgoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoCountOutputType
     */
    select?: NgoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NgoCountOutputType without action
   */
  export type NgoCountOutputTypeCountSectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NgoSectorWhereInput
  }


  /**
   * Count Type SectorCountOutputType
   */

  export type SectorCountOutputType = {
    ngos: number
  }

  export type SectorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngos?: boolean | SectorCountOutputTypeCountNgosArgs
  }

  // Custom InputTypes
  /**
   * SectorCountOutputType without action
   */
  export type SectorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectorCountOutputType
     */
    select?: SectorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectorCountOutputType without action
   */
  export type SectorCountOutputTypeCountNgosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NgoSectorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Ngo
   */

  export type AggregateNgo = {
    _count: NgoCountAggregateOutputType | null
    _avg: NgoAvgAggregateOutputType | null
    _sum: NgoSumAggregateOutputType | null
    _min: NgoMinAggregateOutputType | null
    _max: NgoMaxAggregateOutputType | null
  }

  export type NgoAvgAggregateOutputType = {
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type NgoSumAggregateOutputType = {
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type NgoMinAggregateOutputType = {
    id: string | null
    darpanId: string | null
    name: string | null
    normalizedName: string | null
    serialNumber: string | null
    registrationNumber: string | null
    registrationType: string | null
    registrationRaw: string | null
    email: string | null
    phone: string | null
    mobile: string | null
    website: string | null
    summaryAddress: string | null
    address: string | null
    district: string | null
    state: string | null
    pincode: string | null
    darpanRegistrationDate: Date | null
    registeredWith: string | null
    typeOfNPO: string | null
    actName: string | null
    cityOfRegistration: string | null
    stateOfRegistration: string | null
    dateOfRegistration: Date | null
    registrationDate: Date | null
    operationalStates: string | null
    operationalDistrict: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    geocodingStatus: string | null
    geocodedPincode: string | null
    exactGeocodeMatch: boolean | null
    accuracyLevel: string | null
    sourceUrl: string | null
    scrapedAt: Date | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NgoMaxAggregateOutputType = {
    id: string | null
    darpanId: string | null
    name: string | null
    normalizedName: string | null
    serialNumber: string | null
    registrationNumber: string | null
    registrationType: string | null
    registrationRaw: string | null
    email: string | null
    phone: string | null
    mobile: string | null
    website: string | null
    summaryAddress: string | null
    address: string | null
    district: string | null
    state: string | null
    pincode: string | null
    darpanRegistrationDate: Date | null
    registeredWith: string | null
    typeOfNPO: string | null
    actName: string | null
    cityOfRegistration: string | null
    stateOfRegistration: string | null
    dateOfRegistration: Date | null
    registrationDate: Date | null
    operationalStates: string | null
    operationalDistrict: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    geocodingStatus: string | null
    geocodedPincode: string | null
    exactGeocodeMatch: boolean | null
    accuracyLevel: string | null
    sourceUrl: string | null
    scrapedAt: Date | null
    hash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NgoCountAggregateOutputType = {
    id: number
    darpanId: number
    name: number
    normalizedName: number
    serialNumber: number
    registrationNumber: number
    registrationType: number
    registrationRaw: number
    email: number
    phone: number
    mobile: number
    website: number
    summaryAddress: number
    address: number
    district: number
    state: number
    pincode: number
    darpanRegistrationDate: number
    registeredWith: number
    typeOfNPO: number
    actName: number
    cityOfRegistration: number
    stateOfRegistration: number
    dateOfRegistration: number
    registrationDate: number
    summarySectors: number
    primarySectors: number
    secondarySectors: number
    operationalStates: number
    operationalDistrict: number
    officeBearers: number
    latitude: number
    longitude: number
    geocodingStatus: number
    geocodedPincode: number
    exactGeocodeMatch: number
    accuracyLevel: number
    sourceUrl: number
    scrapedAt: number
    hash: number
    raw: number
    rawScrapedDetails: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NgoAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type NgoSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type NgoMinAggregateInputType = {
    id?: true
    darpanId?: true
    name?: true
    normalizedName?: true
    serialNumber?: true
    registrationNumber?: true
    registrationType?: true
    registrationRaw?: true
    email?: true
    phone?: true
    mobile?: true
    website?: true
    summaryAddress?: true
    address?: true
    district?: true
    state?: true
    pincode?: true
    darpanRegistrationDate?: true
    registeredWith?: true
    typeOfNPO?: true
    actName?: true
    cityOfRegistration?: true
    stateOfRegistration?: true
    dateOfRegistration?: true
    registrationDate?: true
    operationalStates?: true
    operationalDistrict?: true
    latitude?: true
    longitude?: true
    geocodingStatus?: true
    geocodedPincode?: true
    exactGeocodeMatch?: true
    accuracyLevel?: true
    sourceUrl?: true
    scrapedAt?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NgoMaxAggregateInputType = {
    id?: true
    darpanId?: true
    name?: true
    normalizedName?: true
    serialNumber?: true
    registrationNumber?: true
    registrationType?: true
    registrationRaw?: true
    email?: true
    phone?: true
    mobile?: true
    website?: true
    summaryAddress?: true
    address?: true
    district?: true
    state?: true
    pincode?: true
    darpanRegistrationDate?: true
    registeredWith?: true
    typeOfNPO?: true
    actName?: true
    cityOfRegistration?: true
    stateOfRegistration?: true
    dateOfRegistration?: true
    registrationDate?: true
    operationalStates?: true
    operationalDistrict?: true
    latitude?: true
    longitude?: true
    geocodingStatus?: true
    geocodedPincode?: true
    exactGeocodeMatch?: true
    accuracyLevel?: true
    sourceUrl?: true
    scrapedAt?: true
    hash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NgoCountAggregateInputType = {
    id?: true
    darpanId?: true
    name?: true
    normalizedName?: true
    serialNumber?: true
    registrationNumber?: true
    registrationType?: true
    registrationRaw?: true
    email?: true
    phone?: true
    mobile?: true
    website?: true
    summaryAddress?: true
    address?: true
    district?: true
    state?: true
    pincode?: true
    darpanRegistrationDate?: true
    registeredWith?: true
    typeOfNPO?: true
    actName?: true
    cityOfRegistration?: true
    stateOfRegistration?: true
    dateOfRegistration?: true
    registrationDate?: true
    summarySectors?: true
    primarySectors?: true
    secondarySectors?: true
    operationalStates?: true
    operationalDistrict?: true
    officeBearers?: true
    latitude?: true
    longitude?: true
    geocodingStatus?: true
    geocodedPincode?: true
    exactGeocodeMatch?: true
    accuracyLevel?: true
    sourceUrl?: true
    scrapedAt?: true
    hash?: true
    raw?: true
    rawScrapedDetails?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NgoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ngo to aggregate.
     */
    where?: NgoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ngos to fetch.
     */
    orderBy?: NgoOrderByWithRelationInput | NgoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NgoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ngos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ngos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ngos
    **/
    _count?: true | NgoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NgoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NgoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NgoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NgoMaxAggregateInputType
  }

  export type GetNgoAggregateType<T extends NgoAggregateArgs> = {
        [P in keyof T & keyof AggregateNgo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNgo[P]>
      : GetScalarType<T[P], AggregateNgo[P]>
  }




  export type NgoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NgoWhereInput
    orderBy?: NgoOrderByWithAggregationInput | NgoOrderByWithAggregationInput[]
    by: NgoScalarFieldEnum[] | NgoScalarFieldEnum
    having?: NgoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NgoCountAggregateInputType | true
    _avg?: NgoAvgAggregateInputType
    _sum?: NgoSumAggregateInputType
    _min?: NgoMinAggregateInputType
    _max?: NgoMaxAggregateInputType
  }

  export type NgoGroupByOutputType = {
    id: string
    darpanId: string | null
    name: string
    normalizedName: string | null
    serialNumber: string | null
    registrationNumber: string | null
    registrationType: string | null
    registrationRaw: string | null
    email: string | null
    phone: string | null
    mobile: string | null
    website: string | null
    summaryAddress: string | null
    address: string | null
    district: string | null
    state: string | null
    pincode: string | null
    darpanRegistrationDate: Date | null
    registeredWith: string | null
    typeOfNPO: string | null
    actName: string | null
    cityOfRegistration: string | null
    stateOfRegistration: string | null
    dateOfRegistration: Date | null
    registrationDate: Date | null
    summarySectors: string[]
    primarySectors: string[]
    secondarySectors: string[]
    operationalStates: string | null
    operationalDistrict: string | null
    officeBearers: JsonValue | null
    latitude: Decimal | null
    longitude: Decimal | null
    geocodingStatus: string
    geocodedPincode: string | null
    exactGeocodeMatch: boolean | null
    accuracyLevel: string | null
    sourceUrl: string | null
    scrapedAt: Date | null
    hash: string | null
    raw: JsonValue | null
    rawScrapedDetails: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: NgoCountAggregateOutputType | null
    _avg: NgoAvgAggregateOutputType | null
    _sum: NgoSumAggregateOutputType | null
    _min: NgoMinAggregateOutputType | null
    _max: NgoMaxAggregateOutputType | null
  }

  type GetNgoGroupByPayload<T extends NgoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NgoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NgoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NgoGroupByOutputType[P]>
            : GetScalarType<T[P], NgoGroupByOutputType[P]>
        }
      >
    >


  export type NgoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    darpanId?: boolean
    name?: boolean
    normalizedName?: boolean
    serialNumber?: boolean
    registrationNumber?: boolean
    registrationType?: boolean
    registrationRaw?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    website?: boolean
    summaryAddress?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    darpanRegistrationDate?: boolean
    registeredWith?: boolean
    typeOfNPO?: boolean
    actName?: boolean
    cityOfRegistration?: boolean
    stateOfRegistration?: boolean
    dateOfRegistration?: boolean
    registrationDate?: boolean
    summarySectors?: boolean
    primarySectors?: boolean
    secondarySectors?: boolean
    operationalStates?: boolean
    operationalDistrict?: boolean
    officeBearers?: boolean
    latitude?: boolean
    longitude?: boolean
    geocodingStatus?: boolean
    geocodedPincode?: boolean
    exactGeocodeMatch?: boolean
    accuracyLevel?: boolean
    sourceUrl?: boolean
    scrapedAt?: boolean
    hash?: boolean
    raw?: boolean
    rawScrapedDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sectors?: boolean | Ngo$sectorsArgs<ExtArgs>
    _count?: boolean | NgoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ngo"]>

  export type NgoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    darpanId?: boolean
    name?: boolean
    normalizedName?: boolean
    serialNumber?: boolean
    registrationNumber?: boolean
    registrationType?: boolean
    registrationRaw?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    website?: boolean
    summaryAddress?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    darpanRegistrationDate?: boolean
    registeredWith?: boolean
    typeOfNPO?: boolean
    actName?: boolean
    cityOfRegistration?: boolean
    stateOfRegistration?: boolean
    dateOfRegistration?: boolean
    registrationDate?: boolean
    summarySectors?: boolean
    primarySectors?: boolean
    secondarySectors?: boolean
    operationalStates?: boolean
    operationalDistrict?: boolean
    officeBearers?: boolean
    latitude?: boolean
    longitude?: boolean
    geocodingStatus?: boolean
    geocodedPincode?: boolean
    exactGeocodeMatch?: boolean
    accuracyLevel?: boolean
    sourceUrl?: boolean
    scrapedAt?: boolean
    hash?: boolean
    raw?: boolean
    rawScrapedDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ngo"]>

  export type NgoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    darpanId?: boolean
    name?: boolean
    normalizedName?: boolean
    serialNumber?: boolean
    registrationNumber?: boolean
    registrationType?: boolean
    registrationRaw?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    website?: boolean
    summaryAddress?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    darpanRegistrationDate?: boolean
    registeredWith?: boolean
    typeOfNPO?: boolean
    actName?: boolean
    cityOfRegistration?: boolean
    stateOfRegistration?: boolean
    dateOfRegistration?: boolean
    registrationDate?: boolean
    summarySectors?: boolean
    primarySectors?: boolean
    secondarySectors?: boolean
    operationalStates?: boolean
    operationalDistrict?: boolean
    officeBearers?: boolean
    latitude?: boolean
    longitude?: boolean
    geocodingStatus?: boolean
    geocodedPincode?: boolean
    exactGeocodeMatch?: boolean
    accuracyLevel?: boolean
    sourceUrl?: boolean
    scrapedAt?: boolean
    hash?: boolean
    raw?: boolean
    rawScrapedDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ngo"]>

  export type NgoSelectScalar = {
    id?: boolean
    darpanId?: boolean
    name?: boolean
    normalizedName?: boolean
    serialNumber?: boolean
    registrationNumber?: boolean
    registrationType?: boolean
    registrationRaw?: boolean
    email?: boolean
    phone?: boolean
    mobile?: boolean
    website?: boolean
    summaryAddress?: boolean
    address?: boolean
    district?: boolean
    state?: boolean
    pincode?: boolean
    darpanRegistrationDate?: boolean
    registeredWith?: boolean
    typeOfNPO?: boolean
    actName?: boolean
    cityOfRegistration?: boolean
    stateOfRegistration?: boolean
    dateOfRegistration?: boolean
    registrationDate?: boolean
    summarySectors?: boolean
    primarySectors?: boolean
    secondarySectors?: boolean
    operationalStates?: boolean
    operationalDistrict?: boolean
    officeBearers?: boolean
    latitude?: boolean
    longitude?: boolean
    geocodingStatus?: boolean
    geocodedPincode?: boolean
    exactGeocodeMatch?: boolean
    accuracyLevel?: boolean
    sourceUrl?: boolean
    scrapedAt?: boolean
    hash?: boolean
    raw?: boolean
    rawScrapedDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NgoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "darpanId" | "name" | "normalizedName" | "serialNumber" | "registrationNumber" | "registrationType" | "registrationRaw" | "email" | "phone" | "mobile" | "website" | "summaryAddress" | "address" | "district" | "state" | "pincode" | "darpanRegistrationDate" | "registeredWith" | "typeOfNPO" | "actName" | "cityOfRegistration" | "stateOfRegistration" | "dateOfRegistration" | "registrationDate" | "summarySectors" | "primarySectors" | "secondarySectors" | "operationalStates" | "operationalDistrict" | "officeBearers" | "latitude" | "longitude" | "geocodingStatus" | "geocodedPincode" | "exactGeocodeMatch" | "accuracyLevel" | "sourceUrl" | "scrapedAt" | "hash" | "raw" | "rawScrapedDetails" | "createdAt" | "updatedAt", ExtArgs["result"]["ngo"]>
  export type NgoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sectors?: boolean | Ngo$sectorsArgs<ExtArgs>
    _count?: boolean | NgoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NgoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NgoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NgoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ngo"
    objects: {
      sectors: Prisma.$NgoSectorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      darpanId: string | null
      name: string
      normalizedName: string | null
      serialNumber: string | null
      registrationNumber: string | null
      registrationType: string | null
      registrationRaw: string | null
      email: string | null
      phone: string | null
      mobile: string | null
      website: string | null
      summaryAddress: string | null
      address: string | null
      district: string | null
      state: string | null
      pincode: string | null
      darpanRegistrationDate: Date | null
      registeredWith: string | null
      typeOfNPO: string | null
      actName: string | null
      cityOfRegistration: string | null
      stateOfRegistration: string | null
      dateOfRegistration: Date | null
      registrationDate: Date | null
      summarySectors: string[]
      primarySectors: string[]
      secondarySectors: string[]
      operationalStates: string | null
      operationalDistrict: string | null
      officeBearers: Prisma.JsonValue | null
      latitude: Prisma.Decimal | null
      longitude: Prisma.Decimal | null
      geocodingStatus: string
      geocodedPincode: string | null
      exactGeocodeMatch: boolean | null
      accuracyLevel: string | null
      sourceUrl: string | null
      scrapedAt: Date | null
      hash: string | null
      raw: Prisma.JsonValue | null
      rawScrapedDetails: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ngo"]>
    composites: {}
  }

  type NgoGetPayload<S extends boolean | null | undefined | NgoDefaultArgs> = $Result.GetResult<Prisma.$NgoPayload, S>

  type NgoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NgoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NgoCountAggregateInputType | true
    }

  export interface NgoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ngo'], meta: { name: 'Ngo' } }
    /**
     * Find zero or one Ngo that matches the filter.
     * @param {NgoFindUniqueArgs} args - Arguments to find a Ngo
     * @example
     * // Get one Ngo
     * const ngo = await prisma.ngo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NgoFindUniqueArgs>(args: SelectSubset<T, NgoFindUniqueArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ngo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NgoFindUniqueOrThrowArgs} args - Arguments to find a Ngo
     * @example
     * // Get one Ngo
     * const ngo = await prisma.ngo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NgoFindUniqueOrThrowArgs>(args: SelectSubset<T, NgoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ngo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoFindFirstArgs} args - Arguments to find a Ngo
     * @example
     * // Get one Ngo
     * const ngo = await prisma.ngo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NgoFindFirstArgs>(args?: SelectSubset<T, NgoFindFirstArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ngo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoFindFirstOrThrowArgs} args - Arguments to find a Ngo
     * @example
     * // Get one Ngo
     * const ngo = await prisma.ngo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NgoFindFirstOrThrowArgs>(args?: SelectSubset<T, NgoFindFirstOrThrowArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ngos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ngos
     * const ngos = await prisma.ngo.findMany()
     * 
     * // Get first 10 Ngos
     * const ngos = await prisma.ngo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ngoWithIdOnly = await prisma.ngo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NgoFindManyArgs>(args?: SelectSubset<T, NgoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ngo.
     * @param {NgoCreateArgs} args - Arguments to create a Ngo.
     * @example
     * // Create one Ngo
     * const Ngo = await prisma.ngo.create({
     *   data: {
     *     // ... data to create a Ngo
     *   }
     * })
     * 
     */
    create<T extends NgoCreateArgs>(args: SelectSubset<T, NgoCreateArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ngos.
     * @param {NgoCreateManyArgs} args - Arguments to create many Ngos.
     * @example
     * // Create many Ngos
     * const ngo = await prisma.ngo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NgoCreateManyArgs>(args?: SelectSubset<T, NgoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ngos and returns the data saved in the database.
     * @param {NgoCreateManyAndReturnArgs} args - Arguments to create many Ngos.
     * @example
     * // Create many Ngos
     * const ngo = await prisma.ngo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ngos and only return the `id`
     * const ngoWithIdOnly = await prisma.ngo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NgoCreateManyAndReturnArgs>(args?: SelectSubset<T, NgoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ngo.
     * @param {NgoDeleteArgs} args - Arguments to delete one Ngo.
     * @example
     * // Delete one Ngo
     * const Ngo = await prisma.ngo.delete({
     *   where: {
     *     // ... filter to delete one Ngo
     *   }
     * })
     * 
     */
    delete<T extends NgoDeleteArgs>(args: SelectSubset<T, NgoDeleteArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ngo.
     * @param {NgoUpdateArgs} args - Arguments to update one Ngo.
     * @example
     * // Update one Ngo
     * const ngo = await prisma.ngo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NgoUpdateArgs>(args: SelectSubset<T, NgoUpdateArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ngos.
     * @param {NgoDeleteManyArgs} args - Arguments to filter Ngos to delete.
     * @example
     * // Delete a few Ngos
     * const { count } = await prisma.ngo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NgoDeleteManyArgs>(args?: SelectSubset<T, NgoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ngos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ngos
     * const ngo = await prisma.ngo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NgoUpdateManyArgs>(args: SelectSubset<T, NgoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ngos and returns the data updated in the database.
     * @param {NgoUpdateManyAndReturnArgs} args - Arguments to update many Ngos.
     * @example
     * // Update many Ngos
     * const ngo = await prisma.ngo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ngos and only return the `id`
     * const ngoWithIdOnly = await prisma.ngo.updateManyAndReturn({
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
    updateManyAndReturn<T extends NgoUpdateManyAndReturnArgs>(args: SelectSubset<T, NgoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ngo.
     * @param {NgoUpsertArgs} args - Arguments to update or create a Ngo.
     * @example
     * // Update or create a Ngo
     * const ngo = await prisma.ngo.upsert({
     *   create: {
     *     // ... data to create a Ngo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ngo we want to update
     *   }
     * })
     */
    upsert<T extends NgoUpsertArgs>(args: SelectSubset<T, NgoUpsertArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ngos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoCountArgs} args - Arguments to filter Ngos to count.
     * @example
     * // Count the number of Ngos
     * const count = await prisma.ngo.count({
     *   where: {
     *     // ... the filter for the Ngos we want to count
     *   }
     * })
    **/
    count<T extends NgoCountArgs>(
      args?: Subset<T, NgoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NgoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ngo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NgoAggregateArgs>(args: Subset<T, NgoAggregateArgs>): Prisma.PrismaPromise<GetNgoAggregateType<T>>

    /**
     * Group by Ngo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoGroupByArgs} args - Group by arguments.
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
      T extends NgoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NgoGroupByArgs['orderBy'] }
        : { orderBy?: NgoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NgoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNgoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ngo model
   */
  readonly fields: NgoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ngo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NgoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sectors<T extends Ngo$sectorsArgs<ExtArgs> = {}>(args?: Subset<T, Ngo$sectorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ngo model
   */
  interface NgoFieldRefs {
    readonly id: FieldRef<"Ngo", 'String'>
    readonly darpanId: FieldRef<"Ngo", 'String'>
    readonly name: FieldRef<"Ngo", 'String'>
    readonly normalizedName: FieldRef<"Ngo", 'String'>
    readonly serialNumber: FieldRef<"Ngo", 'String'>
    readonly registrationNumber: FieldRef<"Ngo", 'String'>
    readonly registrationType: FieldRef<"Ngo", 'String'>
    readonly registrationRaw: FieldRef<"Ngo", 'String'>
    readonly email: FieldRef<"Ngo", 'String'>
    readonly phone: FieldRef<"Ngo", 'String'>
    readonly mobile: FieldRef<"Ngo", 'String'>
    readonly website: FieldRef<"Ngo", 'String'>
    readonly summaryAddress: FieldRef<"Ngo", 'String'>
    readonly address: FieldRef<"Ngo", 'String'>
    readonly district: FieldRef<"Ngo", 'String'>
    readonly state: FieldRef<"Ngo", 'String'>
    readonly pincode: FieldRef<"Ngo", 'String'>
    readonly darpanRegistrationDate: FieldRef<"Ngo", 'DateTime'>
    readonly registeredWith: FieldRef<"Ngo", 'String'>
    readonly typeOfNPO: FieldRef<"Ngo", 'String'>
    readonly actName: FieldRef<"Ngo", 'String'>
    readonly cityOfRegistration: FieldRef<"Ngo", 'String'>
    readonly stateOfRegistration: FieldRef<"Ngo", 'String'>
    readonly dateOfRegistration: FieldRef<"Ngo", 'DateTime'>
    readonly registrationDate: FieldRef<"Ngo", 'DateTime'>
    readonly summarySectors: FieldRef<"Ngo", 'String[]'>
    readonly primarySectors: FieldRef<"Ngo", 'String[]'>
    readonly secondarySectors: FieldRef<"Ngo", 'String[]'>
    readonly operationalStates: FieldRef<"Ngo", 'String'>
    readonly operationalDistrict: FieldRef<"Ngo", 'String'>
    readonly officeBearers: FieldRef<"Ngo", 'Json'>
    readonly latitude: FieldRef<"Ngo", 'Decimal'>
    readonly longitude: FieldRef<"Ngo", 'Decimal'>
    readonly geocodingStatus: FieldRef<"Ngo", 'String'>
    readonly geocodedPincode: FieldRef<"Ngo", 'String'>
    readonly exactGeocodeMatch: FieldRef<"Ngo", 'Boolean'>
    readonly accuracyLevel: FieldRef<"Ngo", 'String'>
    readonly sourceUrl: FieldRef<"Ngo", 'String'>
    readonly scrapedAt: FieldRef<"Ngo", 'DateTime'>
    readonly hash: FieldRef<"Ngo", 'String'>
    readonly raw: FieldRef<"Ngo", 'Json'>
    readonly rawScrapedDetails: FieldRef<"Ngo", 'Json'>
    readonly createdAt: FieldRef<"Ngo", 'DateTime'>
    readonly updatedAt: FieldRef<"Ngo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ngo findUnique
   */
  export type NgoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * Filter, which Ngo to fetch.
     */
    where: NgoWhereUniqueInput
  }

  /**
   * Ngo findUniqueOrThrow
   */
  export type NgoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * Filter, which Ngo to fetch.
     */
    where: NgoWhereUniqueInput
  }

  /**
   * Ngo findFirst
   */
  export type NgoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * Filter, which Ngo to fetch.
     */
    where?: NgoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ngos to fetch.
     */
    orderBy?: NgoOrderByWithRelationInput | NgoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ngos.
     */
    cursor?: NgoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ngos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ngos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ngos.
     */
    distinct?: NgoScalarFieldEnum | NgoScalarFieldEnum[]
  }

  /**
   * Ngo findFirstOrThrow
   */
  export type NgoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * Filter, which Ngo to fetch.
     */
    where?: NgoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ngos to fetch.
     */
    orderBy?: NgoOrderByWithRelationInput | NgoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ngos.
     */
    cursor?: NgoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ngos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ngos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ngos.
     */
    distinct?: NgoScalarFieldEnum | NgoScalarFieldEnum[]
  }

  /**
   * Ngo findMany
   */
  export type NgoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * Filter, which Ngos to fetch.
     */
    where?: NgoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ngos to fetch.
     */
    orderBy?: NgoOrderByWithRelationInput | NgoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ngos.
     */
    cursor?: NgoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ngos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ngos.
     */
    skip?: number
    distinct?: NgoScalarFieldEnum | NgoScalarFieldEnum[]
  }

  /**
   * Ngo create
   */
  export type NgoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * The data needed to create a Ngo.
     */
    data: XOR<NgoCreateInput, NgoUncheckedCreateInput>
  }

  /**
   * Ngo createMany
   */
  export type NgoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ngos.
     */
    data: NgoCreateManyInput | NgoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ngo createManyAndReturn
   */
  export type NgoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * The data used to create many Ngos.
     */
    data: NgoCreateManyInput | NgoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ngo update
   */
  export type NgoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * The data needed to update a Ngo.
     */
    data: XOR<NgoUpdateInput, NgoUncheckedUpdateInput>
    /**
     * Choose, which Ngo to update.
     */
    where: NgoWhereUniqueInput
  }

  /**
   * Ngo updateMany
   */
  export type NgoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ngos.
     */
    data: XOR<NgoUpdateManyMutationInput, NgoUncheckedUpdateManyInput>
    /**
     * Filter which Ngos to update
     */
    where?: NgoWhereInput
    /**
     * Limit how many Ngos to update.
     */
    limit?: number
  }

  /**
   * Ngo updateManyAndReturn
   */
  export type NgoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * The data used to update Ngos.
     */
    data: XOR<NgoUpdateManyMutationInput, NgoUncheckedUpdateManyInput>
    /**
     * Filter which Ngos to update
     */
    where?: NgoWhereInput
    /**
     * Limit how many Ngos to update.
     */
    limit?: number
  }

  /**
   * Ngo upsert
   */
  export type NgoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * The filter to search for the Ngo to update in case it exists.
     */
    where: NgoWhereUniqueInput
    /**
     * In case the Ngo found by the `where` argument doesn't exist, create a new Ngo with this data.
     */
    create: XOR<NgoCreateInput, NgoUncheckedCreateInput>
    /**
     * In case the Ngo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NgoUpdateInput, NgoUncheckedUpdateInput>
  }

  /**
   * Ngo delete
   */
  export type NgoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
    /**
     * Filter which Ngo to delete.
     */
    where: NgoWhereUniqueInput
  }

  /**
   * Ngo deleteMany
   */
  export type NgoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ngos to delete
     */
    where?: NgoWhereInput
    /**
     * Limit how many Ngos to delete.
     */
    limit?: number
  }

  /**
   * Ngo.sectors
   */
  export type Ngo$sectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    where?: NgoSectorWhereInput
    orderBy?: NgoSectorOrderByWithRelationInput | NgoSectorOrderByWithRelationInput[]
    cursor?: NgoSectorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NgoSectorScalarFieldEnum | NgoSectorScalarFieldEnum[]
  }

  /**
   * Ngo without action
   */
  export type NgoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ngo
     */
    select?: NgoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ngo
     */
    omit?: NgoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoInclude<ExtArgs> | null
  }


  /**
   * Model ScrapeRun
   */

  export type AggregateScrapeRun = {
    _count: ScrapeRunCountAggregateOutputType | null
    _avg: ScrapeRunAvgAggregateOutputType | null
    _sum: ScrapeRunSumAggregateOutputType | null
    _min: ScrapeRunMinAggregateOutputType | null
    _max: ScrapeRunMaxAggregateOutputType | null
  }

  export type ScrapeRunAvgAggregateOutputType = {
    durationMs: number | null
    totalDiscovered: number | null
    totalProcessed: number | null
    inserted: number | null
    updated: number | null
    skipped: number | null
  }

  export type ScrapeRunSumAggregateOutputType = {
    durationMs: number | null
    totalDiscovered: number | null
    totalProcessed: number | null
    inserted: number | null
    updated: number | null
    skipped: number | null
  }

  export type ScrapeRunMinAggregateOutputType = {
    id: string | null
    status: string | null
    startedAt: Date | null
    finishedAt: Date | null
    durationMs: number | null
    totalDiscovered: number | null
    totalProcessed: number | null
    inserted: number | null
    updated: number | null
    skipped: number | null
    message: string | null
    createdAt: Date | null
  }

  export type ScrapeRunMaxAggregateOutputType = {
    id: string | null
    status: string | null
    startedAt: Date | null
    finishedAt: Date | null
    durationMs: number | null
    totalDiscovered: number | null
    totalProcessed: number | null
    inserted: number | null
    updated: number | null
    skipped: number | null
    message: string | null
    createdAt: Date | null
  }

  export type ScrapeRunCountAggregateOutputType = {
    id: number
    status: number
    startedAt: number
    finishedAt: number
    durationMs: number
    totalDiscovered: number
    totalProcessed: number
    inserted: number
    updated: number
    skipped: number
    errors: number
    message: number
    createdAt: number
    _all: number
  }


  export type ScrapeRunAvgAggregateInputType = {
    durationMs?: true
    totalDiscovered?: true
    totalProcessed?: true
    inserted?: true
    updated?: true
    skipped?: true
  }

  export type ScrapeRunSumAggregateInputType = {
    durationMs?: true
    totalDiscovered?: true
    totalProcessed?: true
    inserted?: true
    updated?: true
    skipped?: true
  }

  export type ScrapeRunMinAggregateInputType = {
    id?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    durationMs?: true
    totalDiscovered?: true
    totalProcessed?: true
    inserted?: true
    updated?: true
    skipped?: true
    message?: true
    createdAt?: true
  }

  export type ScrapeRunMaxAggregateInputType = {
    id?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    durationMs?: true
    totalDiscovered?: true
    totalProcessed?: true
    inserted?: true
    updated?: true
    skipped?: true
    message?: true
    createdAt?: true
  }

  export type ScrapeRunCountAggregateInputType = {
    id?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    durationMs?: true
    totalDiscovered?: true
    totalProcessed?: true
    inserted?: true
    updated?: true
    skipped?: true
    errors?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type ScrapeRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScrapeRun to aggregate.
     */
    where?: ScrapeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeRuns to fetch.
     */
    orderBy?: ScrapeRunOrderByWithRelationInput | ScrapeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScrapeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScrapeRuns
    **/
    _count?: true | ScrapeRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScrapeRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScrapeRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScrapeRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScrapeRunMaxAggregateInputType
  }

  export type GetScrapeRunAggregateType<T extends ScrapeRunAggregateArgs> = {
        [P in keyof T & keyof AggregateScrapeRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScrapeRun[P]>
      : GetScalarType<T[P], AggregateScrapeRun[P]>
  }




  export type ScrapeRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScrapeRunWhereInput
    orderBy?: ScrapeRunOrderByWithAggregationInput | ScrapeRunOrderByWithAggregationInput[]
    by: ScrapeRunScalarFieldEnum[] | ScrapeRunScalarFieldEnum
    having?: ScrapeRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScrapeRunCountAggregateInputType | true
    _avg?: ScrapeRunAvgAggregateInputType
    _sum?: ScrapeRunSumAggregateInputType
    _min?: ScrapeRunMinAggregateInputType
    _max?: ScrapeRunMaxAggregateInputType
  }

  export type ScrapeRunGroupByOutputType = {
    id: string
    status: string
    startedAt: Date
    finishedAt: Date | null
    durationMs: number | null
    totalDiscovered: number | null
    totalProcessed: number | null
    inserted: number | null
    updated: number | null
    skipped: number | null
    errors: JsonValue | null
    message: string | null
    createdAt: Date
    _count: ScrapeRunCountAggregateOutputType | null
    _avg: ScrapeRunAvgAggregateOutputType | null
    _sum: ScrapeRunSumAggregateOutputType | null
    _min: ScrapeRunMinAggregateOutputType | null
    _max: ScrapeRunMaxAggregateOutputType | null
  }

  type GetScrapeRunGroupByPayload<T extends ScrapeRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScrapeRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScrapeRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScrapeRunGroupByOutputType[P]>
            : GetScalarType<T[P], ScrapeRunGroupByOutputType[P]>
        }
      >
    >


  export type ScrapeRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    durationMs?: boolean
    totalDiscovered?: boolean
    totalProcessed?: boolean
    inserted?: boolean
    updated?: boolean
    skipped?: boolean
    errors?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scrapeRun"]>

  export type ScrapeRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    durationMs?: boolean
    totalDiscovered?: boolean
    totalProcessed?: boolean
    inserted?: boolean
    updated?: boolean
    skipped?: boolean
    errors?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scrapeRun"]>

  export type ScrapeRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    durationMs?: boolean
    totalDiscovered?: boolean
    totalProcessed?: boolean
    inserted?: boolean
    updated?: boolean
    skipped?: boolean
    errors?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scrapeRun"]>

  export type ScrapeRunSelectScalar = {
    id?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    durationMs?: boolean
    totalDiscovered?: boolean
    totalProcessed?: boolean
    inserted?: boolean
    updated?: boolean
    skipped?: boolean
    errors?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type ScrapeRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "startedAt" | "finishedAt" | "durationMs" | "totalDiscovered" | "totalProcessed" | "inserted" | "updated" | "skipped" | "errors" | "message" | "createdAt", ExtArgs["result"]["scrapeRun"]>

  export type $ScrapeRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScrapeRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      startedAt: Date
      finishedAt: Date | null
      durationMs: number | null
      totalDiscovered: number | null
      totalProcessed: number | null
      inserted: number | null
      updated: number | null
      skipped: number | null
      errors: Prisma.JsonValue | null
      message: string | null
      createdAt: Date
    }, ExtArgs["result"]["scrapeRun"]>
    composites: {}
  }

  type ScrapeRunGetPayload<S extends boolean | null | undefined | ScrapeRunDefaultArgs> = $Result.GetResult<Prisma.$ScrapeRunPayload, S>

  type ScrapeRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScrapeRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScrapeRunCountAggregateInputType | true
    }

  export interface ScrapeRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScrapeRun'], meta: { name: 'ScrapeRun' } }
    /**
     * Find zero or one ScrapeRun that matches the filter.
     * @param {ScrapeRunFindUniqueArgs} args - Arguments to find a ScrapeRun
     * @example
     * // Get one ScrapeRun
     * const scrapeRun = await prisma.scrapeRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScrapeRunFindUniqueArgs>(args: SelectSubset<T, ScrapeRunFindUniqueArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScrapeRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScrapeRunFindUniqueOrThrowArgs} args - Arguments to find a ScrapeRun
     * @example
     * // Get one ScrapeRun
     * const scrapeRun = await prisma.scrapeRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScrapeRunFindUniqueOrThrowArgs>(args: SelectSubset<T, ScrapeRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScrapeRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunFindFirstArgs} args - Arguments to find a ScrapeRun
     * @example
     * // Get one ScrapeRun
     * const scrapeRun = await prisma.scrapeRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScrapeRunFindFirstArgs>(args?: SelectSubset<T, ScrapeRunFindFirstArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScrapeRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunFindFirstOrThrowArgs} args - Arguments to find a ScrapeRun
     * @example
     * // Get one ScrapeRun
     * const scrapeRun = await prisma.scrapeRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScrapeRunFindFirstOrThrowArgs>(args?: SelectSubset<T, ScrapeRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScrapeRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScrapeRuns
     * const scrapeRuns = await prisma.scrapeRun.findMany()
     * 
     * // Get first 10 ScrapeRuns
     * const scrapeRuns = await prisma.scrapeRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scrapeRunWithIdOnly = await prisma.scrapeRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScrapeRunFindManyArgs>(args?: SelectSubset<T, ScrapeRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScrapeRun.
     * @param {ScrapeRunCreateArgs} args - Arguments to create a ScrapeRun.
     * @example
     * // Create one ScrapeRun
     * const ScrapeRun = await prisma.scrapeRun.create({
     *   data: {
     *     // ... data to create a ScrapeRun
     *   }
     * })
     * 
     */
    create<T extends ScrapeRunCreateArgs>(args: SelectSubset<T, ScrapeRunCreateArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScrapeRuns.
     * @param {ScrapeRunCreateManyArgs} args - Arguments to create many ScrapeRuns.
     * @example
     * // Create many ScrapeRuns
     * const scrapeRun = await prisma.scrapeRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScrapeRunCreateManyArgs>(args?: SelectSubset<T, ScrapeRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScrapeRuns and returns the data saved in the database.
     * @param {ScrapeRunCreateManyAndReturnArgs} args - Arguments to create many ScrapeRuns.
     * @example
     * // Create many ScrapeRuns
     * const scrapeRun = await prisma.scrapeRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScrapeRuns and only return the `id`
     * const scrapeRunWithIdOnly = await prisma.scrapeRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScrapeRunCreateManyAndReturnArgs>(args?: SelectSubset<T, ScrapeRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScrapeRun.
     * @param {ScrapeRunDeleteArgs} args - Arguments to delete one ScrapeRun.
     * @example
     * // Delete one ScrapeRun
     * const ScrapeRun = await prisma.scrapeRun.delete({
     *   where: {
     *     // ... filter to delete one ScrapeRun
     *   }
     * })
     * 
     */
    delete<T extends ScrapeRunDeleteArgs>(args: SelectSubset<T, ScrapeRunDeleteArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScrapeRun.
     * @param {ScrapeRunUpdateArgs} args - Arguments to update one ScrapeRun.
     * @example
     * // Update one ScrapeRun
     * const scrapeRun = await prisma.scrapeRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScrapeRunUpdateArgs>(args: SelectSubset<T, ScrapeRunUpdateArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScrapeRuns.
     * @param {ScrapeRunDeleteManyArgs} args - Arguments to filter ScrapeRuns to delete.
     * @example
     * // Delete a few ScrapeRuns
     * const { count } = await prisma.scrapeRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScrapeRunDeleteManyArgs>(args?: SelectSubset<T, ScrapeRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScrapeRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScrapeRuns
     * const scrapeRun = await prisma.scrapeRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScrapeRunUpdateManyArgs>(args: SelectSubset<T, ScrapeRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScrapeRuns and returns the data updated in the database.
     * @param {ScrapeRunUpdateManyAndReturnArgs} args - Arguments to update many ScrapeRuns.
     * @example
     * // Update many ScrapeRuns
     * const scrapeRun = await prisma.scrapeRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScrapeRuns and only return the `id`
     * const scrapeRunWithIdOnly = await prisma.scrapeRun.updateManyAndReturn({
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
    updateManyAndReturn<T extends ScrapeRunUpdateManyAndReturnArgs>(args: SelectSubset<T, ScrapeRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScrapeRun.
     * @param {ScrapeRunUpsertArgs} args - Arguments to update or create a ScrapeRun.
     * @example
     * // Update or create a ScrapeRun
     * const scrapeRun = await prisma.scrapeRun.upsert({
     *   create: {
     *     // ... data to create a ScrapeRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScrapeRun we want to update
     *   }
     * })
     */
    upsert<T extends ScrapeRunUpsertArgs>(args: SelectSubset<T, ScrapeRunUpsertArgs<ExtArgs>>): Prisma__ScrapeRunClient<$Result.GetResult<Prisma.$ScrapeRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScrapeRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunCountArgs} args - Arguments to filter ScrapeRuns to count.
     * @example
     * // Count the number of ScrapeRuns
     * const count = await prisma.scrapeRun.count({
     *   where: {
     *     // ... the filter for the ScrapeRuns we want to count
     *   }
     * })
    **/
    count<T extends ScrapeRunCountArgs>(
      args?: Subset<T, ScrapeRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScrapeRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScrapeRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScrapeRunAggregateArgs>(args: Subset<T, ScrapeRunAggregateArgs>): Prisma.PrismaPromise<GetScrapeRunAggregateType<T>>

    /**
     * Group by ScrapeRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScrapeRunGroupByArgs} args - Group by arguments.
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
      T extends ScrapeRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScrapeRunGroupByArgs['orderBy'] }
        : { orderBy?: ScrapeRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScrapeRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScrapeRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScrapeRun model
   */
  readonly fields: ScrapeRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScrapeRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScrapeRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScrapeRun model
   */
  interface ScrapeRunFieldRefs {
    readonly id: FieldRef<"ScrapeRun", 'String'>
    readonly status: FieldRef<"ScrapeRun", 'String'>
    readonly startedAt: FieldRef<"ScrapeRun", 'DateTime'>
    readonly finishedAt: FieldRef<"ScrapeRun", 'DateTime'>
    readonly durationMs: FieldRef<"ScrapeRun", 'Int'>
    readonly totalDiscovered: FieldRef<"ScrapeRun", 'Int'>
    readonly totalProcessed: FieldRef<"ScrapeRun", 'Int'>
    readonly inserted: FieldRef<"ScrapeRun", 'Int'>
    readonly updated: FieldRef<"ScrapeRun", 'Int'>
    readonly skipped: FieldRef<"ScrapeRun", 'Int'>
    readonly errors: FieldRef<"ScrapeRun", 'Json'>
    readonly message: FieldRef<"ScrapeRun", 'String'>
    readonly createdAt: FieldRef<"ScrapeRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScrapeRun findUnique
   */
  export type ScrapeRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeRun to fetch.
     */
    where: ScrapeRunWhereUniqueInput
  }

  /**
   * ScrapeRun findUniqueOrThrow
   */
  export type ScrapeRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeRun to fetch.
     */
    where: ScrapeRunWhereUniqueInput
  }

  /**
   * ScrapeRun findFirst
   */
  export type ScrapeRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeRun to fetch.
     */
    where?: ScrapeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeRuns to fetch.
     */
    orderBy?: ScrapeRunOrderByWithRelationInput | ScrapeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScrapeRuns.
     */
    cursor?: ScrapeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScrapeRuns.
     */
    distinct?: ScrapeRunScalarFieldEnum | ScrapeRunScalarFieldEnum[]
  }

  /**
   * ScrapeRun findFirstOrThrow
   */
  export type ScrapeRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeRun to fetch.
     */
    where?: ScrapeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeRuns to fetch.
     */
    orderBy?: ScrapeRunOrderByWithRelationInput | ScrapeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScrapeRuns.
     */
    cursor?: ScrapeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScrapeRuns.
     */
    distinct?: ScrapeRunScalarFieldEnum | ScrapeRunScalarFieldEnum[]
  }

  /**
   * ScrapeRun findMany
   */
  export type ScrapeRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * Filter, which ScrapeRuns to fetch.
     */
    where?: ScrapeRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScrapeRuns to fetch.
     */
    orderBy?: ScrapeRunOrderByWithRelationInput | ScrapeRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScrapeRuns.
     */
    cursor?: ScrapeRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScrapeRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScrapeRuns.
     */
    skip?: number
    distinct?: ScrapeRunScalarFieldEnum | ScrapeRunScalarFieldEnum[]
  }

  /**
   * ScrapeRun create
   */
  export type ScrapeRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * The data needed to create a ScrapeRun.
     */
    data: XOR<ScrapeRunCreateInput, ScrapeRunUncheckedCreateInput>
  }

  /**
   * ScrapeRun createMany
   */
  export type ScrapeRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScrapeRuns.
     */
    data: ScrapeRunCreateManyInput | ScrapeRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScrapeRun createManyAndReturn
   */
  export type ScrapeRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * The data used to create many ScrapeRuns.
     */
    data: ScrapeRunCreateManyInput | ScrapeRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScrapeRun update
   */
  export type ScrapeRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * The data needed to update a ScrapeRun.
     */
    data: XOR<ScrapeRunUpdateInput, ScrapeRunUncheckedUpdateInput>
    /**
     * Choose, which ScrapeRun to update.
     */
    where: ScrapeRunWhereUniqueInput
  }

  /**
   * ScrapeRun updateMany
   */
  export type ScrapeRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScrapeRuns.
     */
    data: XOR<ScrapeRunUpdateManyMutationInput, ScrapeRunUncheckedUpdateManyInput>
    /**
     * Filter which ScrapeRuns to update
     */
    where?: ScrapeRunWhereInput
    /**
     * Limit how many ScrapeRuns to update.
     */
    limit?: number
  }

  /**
   * ScrapeRun updateManyAndReturn
   */
  export type ScrapeRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * The data used to update ScrapeRuns.
     */
    data: XOR<ScrapeRunUpdateManyMutationInput, ScrapeRunUncheckedUpdateManyInput>
    /**
     * Filter which ScrapeRuns to update
     */
    where?: ScrapeRunWhereInput
    /**
     * Limit how many ScrapeRuns to update.
     */
    limit?: number
  }

  /**
   * ScrapeRun upsert
   */
  export type ScrapeRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * The filter to search for the ScrapeRun to update in case it exists.
     */
    where: ScrapeRunWhereUniqueInput
    /**
     * In case the ScrapeRun found by the `where` argument doesn't exist, create a new ScrapeRun with this data.
     */
    create: XOR<ScrapeRunCreateInput, ScrapeRunUncheckedCreateInput>
    /**
     * In case the ScrapeRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScrapeRunUpdateInput, ScrapeRunUncheckedUpdateInput>
  }

  /**
   * ScrapeRun delete
   */
  export type ScrapeRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
    /**
     * Filter which ScrapeRun to delete.
     */
    where: ScrapeRunWhereUniqueInput
  }

  /**
   * ScrapeRun deleteMany
   */
  export type ScrapeRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScrapeRuns to delete
     */
    where?: ScrapeRunWhereInput
    /**
     * Limit how many ScrapeRuns to delete.
     */
    limit?: number
  }

  /**
   * ScrapeRun without action
   */
  export type ScrapeRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScrapeRun
     */
    select?: ScrapeRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScrapeRun
     */
    omit?: ScrapeRunOmit<ExtArgs> | null
  }


  /**
   * Model Sector
   */

  export type AggregateSector = {
    _count: SectorCountAggregateOutputType | null
    _avg: SectorAvgAggregateOutputType | null
    _sum: SectorSumAggregateOutputType | null
    _min: SectorMinAggregateOutputType | null
    _max: SectorMaxAggregateOutputType | null
  }

  export type SectorAvgAggregateOutputType = {
    id: number | null
  }

  export type SectorSumAggregateOutputType = {
    id: bigint | null
  }

  export type SectorMinAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type SectorMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
  }

  export type SectorCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SectorAvgAggregateInputType = {
    id?: true
  }

  export type SectorSumAggregateInputType = {
    id?: true
  }

  export type SectorMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SectorMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SectorCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sector to aggregate.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sectors
    **/
    _count?: true | SectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectorMaxAggregateInputType
  }

  export type GetSectorAggregateType<T extends SectorAggregateArgs> = {
        [P in keyof T & keyof AggregateSector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSector[P]>
      : GetScalarType<T[P], AggregateSector[P]>
  }




  export type SectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectorWhereInput
    orderBy?: SectorOrderByWithAggregationInput | SectorOrderByWithAggregationInput[]
    by: SectorScalarFieldEnum[] | SectorScalarFieldEnum
    having?: SectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectorCountAggregateInputType | true
    _avg?: SectorAvgAggregateInputType
    _sum?: SectorSumAggregateInputType
    _min?: SectorMinAggregateInputType
    _max?: SectorMaxAggregateInputType
  }

  export type SectorGroupByOutputType = {
    id: bigint
    name: string
    _count: SectorCountAggregateOutputType | null
    _avg: SectorAvgAggregateOutputType | null
    _sum: SectorSumAggregateOutputType | null
    _min: SectorMinAggregateOutputType | null
    _max: SectorMaxAggregateOutputType | null
  }

  type GetSectorGroupByPayload<T extends SectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectorGroupByOutputType[P]>
            : GetScalarType<T[P], SectorGroupByOutputType[P]>
        }
      >
    >


  export type SectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ngos?: boolean | Sector$ngosArgs<ExtArgs>
    _count?: boolean | SectorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sector"]>

  export type SectorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["sector"]>

  export type SectorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["sector"]>

  export type SectorSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type SectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["sector"]>
  export type SectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngos?: boolean | Sector$ngosArgs<ExtArgs>
    _count?: boolean | SectorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SectorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SectorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sector"
    objects: {
      ngos: Prisma.$NgoSectorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
    }, ExtArgs["result"]["sector"]>
    composites: {}
  }

  type SectorGetPayload<S extends boolean | null | undefined | SectorDefaultArgs> = $Result.GetResult<Prisma.$SectorPayload, S>

  type SectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectorCountAggregateInputType | true
    }

  export interface SectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sector'], meta: { name: 'Sector' } }
    /**
     * Find zero or one Sector that matches the filter.
     * @param {SectorFindUniqueArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectorFindUniqueArgs>(args: SelectSubset<T, SectorFindUniqueArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sector that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectorFindUniqueOrThrowArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectorFindUniqueOrThrowArgs>(args: SelectSubset<T, SectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorFindFirstArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectorFindFirstArgs>(args?: SelectSubset<T, SectorFindFirstArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorFindFirstOrThrowArgs} args - Arguments to find a Sector
     * @example
     * // Get one Sector
     * const sector = await prisma.sector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectorFindFirstOrThrowArgs>(args?: SelectSubset<T, SectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sectors
     * const sectors = await prisma.sector.findMany()
     * 
     * // Get first 10 Sectors
     * const sectors = await prisma.sector.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectorWithIdOnly = await prisma.sector.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectorFindManyArgs>(args?: SelectSubset<T, SectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sector.
     * @param {SectorCreateArgs} args - Arguments to create a Sector.
     * @example
     * // Create one Sector
     * const Sector = await prisma.sector.create({
     *   data: {
     *     // ... data to create a Sector
     *   }
     * })
     * 
     */
    create<T extends SectorCreateArgs>(args: SelectSubset<T, SectorCreateArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sectors.
     * @param {SectorCreateManyArgs} args - Arguments to create many Sectors.
     * @example
     * // Create many Sectors
     * const sector = await prisma.sector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectorCreateManyArgs>(args?: SelectSubset<T, SectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sectors and returns the data saved in the database.
     * @param {SectorCreateManyAndReturnArgs} args - Arguments to create many Sectors.
     * @example
     * // Create many Sectors
     * const sector = await prisma.sector.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sectors and only return the `id`
     * const sectorWithIdOnly = await prisma.sector.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectorCreateManyAndReturnArgs>(args?: SelectSubset<T, SectorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sector.
     * @param {SectorDeleteArgs} args - Arguments to delete one Sector.
     * @example
     * // Delete one Sector
     * const Sector = await prisma.sector.delete({
     *   where: {
     *     // ... filter to delete one Sector
     *   }
     * })
     * 
     */
    delete<T extends SectorDeleteArgs>(args: SelectSubset<T, SectorDeleteArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sector.
     * @param {SectorUpdateArgs} args - Arguments to update one Sector.
     * @example
     * // Update one Sector
     * const sector = await prisma.sector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectorUpdateArgs>(args: SelectSubset<T, SectorUpdateArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sectors.
     * @param {SectorDeleteManyArgs} args - Arguments to filter Sectors to delete.
     * @example
     * // Delete a few Sectors
     * const { count } = await prisma.sector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectorDeleteManyArgs>(args?: SelectSubset<T, SectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sectors
     * const sector = await prisma.sector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectorUpdateManyArgs>(args: SelectSubset<T, SectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sectors and returns the data updated in the database.
     * @param {SectorUpdateManyAndReturnArgs} args - Arguments to update many Sectors.
     * @example
     * // Update many Sectors
     * const sector = await prisma.sector.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sectors and only return the `id`
     * const sectorWithIdOnly = await prisma.sector.updateManyAndReturn({
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
    updateManyAndReturn<T extends SectorUpdateManyAndReturnArgs>(args: SelectSubset<T, SectorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sector.
     * @param {SectorUpsertArgs} args - Arguments to update or create a Sector.
     * @example
     * // Update or create a Sector
     * const sector = await prisma.sector.upsert({
     *   create: {
     *     // ... data to create a Sector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sector we want to update
     *   }
     * })
     */
    upsert<T extends SectorUpsertArgs>(args: SelectSubset<T, SectorUpsertArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorCountArgs} args - Arguments to filter Sectors to count.
     * @example
     * // Count the number of Sectors
     * const count = await prisma.sector.count({
     *   where: {
     *     // ... the filter for the Sectors we want to count
     *   }
     * })
    **/
    count<T extends SectorCountArgs>(
      args?: Subset<T, SectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SectorAggregateArgs>(args: Subset<T, SectorAggregateArgs>): Prisma.PrismaPromise<GetSectorAggregateType<T>>

    /**
     * Group by Sector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectorGroupByArgs} args - Group by arguments.
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
      T extends SectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectorGroupByArgs['orderBy'] }
        : { orderBy?: SectorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sector model
   */
  readonly fields: SectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngos<T extends Sector$ngosArgs<ExtArgs> = {}>(args?: Subset<T, Sector$ngosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sector model
   */
  interface SectorFieldRefs {
    readonly id: FieldRef<"Sector", 'BigInt'>
    readonly name: FieldRef<"Sector", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Sector findUnique
   */
  export type SectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector findUniqueOrThrow
   */
  export type SectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector findFirst
   */
  export type SectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sectors.
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sectors.
     */
    distinct?: SectorScalarFieldEnum | SectorScalarFieldEnum[]
  }

  /**
   * Sector findFirstOrThrow
   */
  export type SectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sector to fetch.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sectors.
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sectors.
     */
    distinct?: SectorScalarFieldEnum | SectorScalarFieldEnum[]
  }

  /**
   * Sector findMany
   */
  export type SectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter, which Sectors to fetch.
     */
    where?: SectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sectors to fetch.
     */
    orderBy?: SectorOrderByWithRelationInput | SectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sectors.
     */
    cursor?: SectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sectors.
     */
    skip?: number
    distinct?: SectorScalarFieldEnum | SectorScalarFieldEnum[]
  }

  /**
   * Sector create
   */
  export type SectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * The data needed to create a Sector.
     */
    data: XOR<SectorCreateInput, SectorUncheckedCreateInput>
  }

  /**
   * Sector createMany
   */
  export type SectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sectors.
     */
    data: SectorCreateManyInput | SectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sector createManyAndReturn
   */
  export type SectorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * The data used to create many Sectors.
     */
    data: SectorCreateManyInput | SectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sector update
   */
  export type SectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * The data needed to update a Sector.
     */
    data: XOR<SectorUpdateInput, SectorUncheckedUpdateInput>
    /**
     * Choose, which Sector to update.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector updateMany
   */
  export type SectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sectors.
     */
    data: XOR<SectorUpdateManyMutationInput, SectorUncheckedUpdateManyInput>
    /**
     * Filter which Sectors to update
     */
    where?: SectorWhereInput
    /**
     * Limit how many Sectors to update.
     */
    limit?: number
  }

  /**
   * Sector updateManyAndReturn
   */
  export type SectorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * The data used to update Sectors.
     */
    data: XOR<SectorUpdateManyMutationInput, SectorUncheckedUpdateManyInput>
    /**
     * Filter which Sectors to update
     */
    where?: SectorWhereInput
    /**
     * Limit how many Sectors to update.
     */
    limit?: number
  }

  /**
   * Sector upsert
   */
  export type SectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * The filter to search for the Sector to update in case it exists.
     */
    where: SectorWhereUniqueInput
    /**
     * In case the Sector found by the `where` argument doesn't exist, create a new Sector with this data.
     */
    create: XOR<SectorCreateInput, SectorUncheckedCreateInput>
    /**
     * In case the Sector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectorUpdateInput, SectorUncheckedUpdateInput>
  }

  /**
   * Sector delete
   */
  export type SectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
    /**
     * Filter which Sector to delete.
     */
    where: SectorWhereUniqueInput
  }

  /**
   * Sector deleteMany
   */
  export type SectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sectors to delete
     */
    where?: SectorWhereInput
    /**
     * Limit how many Sectors to delete.
     */
    limit?: number
  }

  /**
   * Sector.ngos
   */
  export type Sector$ngosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    where?: NgoSectorWhereInput
    orderBy?: NgoSectorOrderByWithRelationInput | NgoSectorOrderByWithRelationInput[]
    cursor?: NgoSectorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NgoSectorScalarFieldEnum | NgoSectorScalarFieldEnum[]
  }

  /**
   * Sector without action
   */
  export type SectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sector
     */
    select?: SectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sector
     */
    omit?: SectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectorInclude<ExtArgs> | null
  }


  /**
   * Model NgoSector
   */

  export type AggregateNgoSector = {
    _count: NgoSectorCountAggregateOutputType | null
    _avg: NgoSectorAvgAggregateOutputType | null
    _sum: NgoSectorSumAggregateOutputType | null
    _min: NgoSectorMinAggregateOutputType | null
    _max: NgoSectorMaxAggregateOutputType | null
  }

  export type NgoSectorAvgAggregateOutputType = {
    sectorId: number | null
  }

  export type NgoSectorSumAggregateOutputType = {
    sectorId: bigint | null
  }

  export type NgoSectorMinAggregateOutputType = {
    ngoId: string | null
    sectorId: bigint | null
  }

  export type NgoSectorMaxAggregateOutputType = {
    ngoId: string | null
    sectorId: bigint | null
  }

  export type NgoSectorCountAggregateOutputType = {
    ngoId: number
    sectorId: number
    _all: number
  }


  export type NgoSectorAvgAggregateInputType = {
    sectorId?: true
  }

  export type NgoSectorSumAggregateInputType = {
    sectorId?: true
  }

  export type NgoSectorMinAggregateInputType = {
    ngoId?: true
    sectorId?: true
  }

  export type NgoSectorMaxAggregateInputType = {
    ngoId?: true
    sectorId?: true
  }

  export type NgoSectorCountAggregateInputType = {
    ngoId?: true
    sectorId?: true
    _all?: true
  }

  export type NgoSectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NgoSector to aggregate.
     */
    where?: NgoSectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NgoSectors to fetch.
     */
    orderBy?: NgoSectorOrderByWithRelationInput | NgoSectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NgoSectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NgoSectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NgoSectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NgoSectors
    **/
    _count?: true | NgoSectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NgoSectorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NgoSectorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NgoSectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NgoSectorMaxAggregateInputType
  }

  export type GetNgoSectorAggregateType<T extends NgoSectorAggregateArgs> = {
        [P in keyof T & keyof AggregateNgoSector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNgoSector[P]>
      : GetScalarType<T[P], AggregateNgoSector[P]>
  }




  export type NgoSectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NgoSectorWhereInput
    orderBy?: NgoSectorOrderByWithAggregationInput | NgoSectorOrderByWithAggregationInput[]
    by: NgoSectorScalarFieldEnum[] | NgoSectorScalarFieldEnum
    having?: NgoSectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NgoSectorCountAggregateInputType | true
    _avg?: NgoSectorAvgAggregateInputType
    _sum?: NgoSectorSumAggregateInputType
    _min?: NgoSectorMinAggregateInputType
    _max?: NgoSectorMaxAggregateInputType
  }

  export type NgoSectorGroupByOutputType = {
    ngoId: string
    sectorId: bigint
    _count: NgoSectorCountAggregateOutputType | null
    _avg: NgoSectorAvgAggregateOutputType | null
    _sum: NgoSectorSumAggregateOutputType | null
    _min: NgoSectorMinAggregateOutputType | null
    _max: NgoSectorMaxAggregateOutputType | null
  }

  type GetNgoSectorGroupByPayload<T extends NgoSectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NgoSectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NgoSectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NgoSectorGroupByOutputType[P]>
            : GetScalarType<T[P], NgoSectorGroupByOutputType[P]>
        }
      >
    >


  export type NgoSectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ngoId?: boolean
    sectorId?: boolean
    ngo?: boolean | NgoDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ngoSector"]>

  export type NgoSectorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ngoId?: boolean
    sectorId?: boolean
    ngo?: boolean | NgoDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ngoSector"]>

  export type NgoSectorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ngoId?: boolean
    sectorId?: boolean
    ngo?: boolean | NgoDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ngoSector"]>

  export type NgoSectorSelectScalar = {
    ngoId?: boolean
    sectorId?: boolean
  }

  export type NgoSectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ngoId" | "sectorId", ExtArgs["result"]["ngoSector"]>
  export type NgoSectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | NgoDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type NgoSectorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | NgoDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }
  export type NgoSectorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ngo?: boolean | NgoDefaultArgs<ExtArgs>
    sector?: boolean | SectorDefaultArgs<ExtArgs>
  }

  export type $NgoSectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NgoSector"
    objects: {
      ngo: Prisma.$NgoPayload<ExtArgs>
      sector: Prisma.$SectorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      ngoId: string
      sectorId: bigint
    }, ExtArgs["result"]["ngoSector"]>
    composites: {}
  }

  type NgoSectorGetPayload<S extends boolean | null | undefined | NgoSectorDefaultArgs> = $Result.GetResult<Prisma.$NgoSectorPayload, S>

  type NgoSectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NgoSectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NgoSectorCountAggregateInputType | true
    }

  export interface NgoSectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NgoSector'], meta: { name: 'NgoSector' } }
    /**
     * Find zero or one NgoSector that matches the filter.
     * @param {NgoSectorFindUniqueArgs} args - Arguments to find a NgoSector
     * @example
     * // Get one NgoSector
     * const ngoSector = await prisma.ngoSector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NgoSectorFindUniqueArgs>(args: SelectSubset<T, NgoSectorFindUniqueArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NgoSector that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NgoSectorFindUniqueOrThrowArgs} args - Arguments to find a NgoSector
     * @example
     * // Get one NgoSector
     * const ngoSector = await prisma.ngoSector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NgoSectorFindUniqueOrThrowArgs>(args: SelectSubset<T, NgoSectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NgoSector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorFindFirstArgs} args - Arguments to find a NgoSector
     * @example
     * // Get one NgoSector
     * const ngoSector = await prisma.ngoSector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NgoSectorFindFirstArgs>(args?: SelectSubset<T, NgoSectorFindFirstArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NgoSector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorFindFirstOrThrowArgs} args - Arguments to find a NgoSector
     * @example
     * // Get one NgoSector
     * const ngoSector = await prisma.ngoSector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NgoSectorFindFirstOrThrowArgs>(args?: SelectSubset<T, NgoSectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NgoSectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NgoSectors
     * const ngoSectors = await prisma.ngoSector.findMany()
     * 
     * // Get first 10 NgoSectors
     * const ngoSectors = await prisma.ngoSector.findMany({ take: 10 })
     * 
     * // Only select the `ngoId`
     * const ngoSectorWithNgoIdOnly = await prisma.ngoSector.findMany({ select: { ngoId: true } })
     * 
     */
    findMany<T extends NgoSectorFindManyArgs>(args?: SelectSubset<T, NgoSectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NgoSector.
     * @param {NgoSectorCreateArgs} args - Arguments to create a NgoSector.
     * @example
     * // Create one NgoSector
     * const NgoSector = await prisma.ngoSector.create({
     *   data: {
     *     // ... data to create a NgoSector
     *   }
     * })
     * 
     */
    create<T extends NgoSectorCreateArgs>(args: SelectSubset<T, NgoSectorCreateArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NgoSectors.
     * @param {NgoSectorCreateManyArgs} args - Arguments to create many NgoSectors.
     * @example
     * // Create many NgoSectors
     * const ngoSector = await prisma.ngoSector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NgoSectorCreateManyArgs>(args?: SelectSubset<T, NgoSectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NgoSectors and returns the data saved in the database.
     * @param {NgoSectorCreateManyAndReturnArgs} args - Arguments to create many NgoSectors.
     * @example
     * // Create many NgoSectors
     * const ngoSector = await prisma.ngoSector.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NgoSectors and only return the `ngoId`
     * const ngoSectorWithNgoIdOnly = await prisma.ngoSector.createManyAndReturn({
     *   select: { ngoId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NgoSectorCreateManyAndReturnArgs>(args?: SelectSubset<T, NgoSectorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NgoSector.
     * @param {NgoSectorDeleteArgs} args - Arguments to delete one NgoSector.
     * @example
     * // Delete one NgoSector
     * const NgoSector = await prisma.ngoSector.delete({
     *   where: {
     *     // ... filter to delete one NgoSector
     *   }
     * })
     * 
     */
    delete<T extends NgoSectorDeleteArgs>(args: SelectSubset<T, NgoSectorDeleteArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NgoSector.
     * @param {NgoSectorUpdateArgs} args - Arguments to update one NgoSector.
     * @example
     * // Update one NgoSector
     * const ngoSector = await prisma.ngoSector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NgoSectorUpdateArgs>(args: SelectSubset<T, NgoSectorUpdateArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NgoSectors.
     * @param {NgoSectorDeleteManyArgs} args - Arguments to filter NgoSectors to delete.
     * @example
     * // Delete a few NgoSectors
     * const { count } = await prisma.ngoSector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NgoSectorDeleteManyArgs>(args?: SelectSubset<T, NgoSectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NgoSectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NgoSectors
     * const ngoSector = await prisma.ngoSector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NgoSectorUpdateManyArgs>(args: SelectSubset<T, NgoSectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NgoSectors and returns the data updated in the database.
     * @param {NgoSectorUpdateManyAndReturnArgs} args - Arguments to update many NgoSectors.
     * @example
     * // Update many NgoSectors
     * const ngoSector = await prisma.ngoSector.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NgoSectors and only return the `ngoId`
     * const ngoSectorWithNgoIdOnly = await prisma.ngoSector.updateManyAndReturn({
     *   select: { ngoId: true },
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
    updateManyAndReturn<T extends NgoSectorUpdateManyAndReturnArgs>(args: SelectSubset<T, NgoSectorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NgoSector.
     * @param {NgoSectorUpsertArgs} args - Arguments to update or create a NgoSector.
     * @example
     * // Update or create a NgoSector
     * const ngoSector = await prisma.ngoSector.upsert({
     *   create: {
     *     // ... data to create a NgoSector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NgoSector we want to update
     *   }
     * })
     */
    upsert<T extends NgoSectorUpsertArgs>(args: SelectSubset<T, NgoSectorUpsertArgs<ExtArgs>>): Prisma__NgoSectorClient<$Result.GetResult<Prisma.$NgoSectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NgoSectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorCountArgs} args - Arguments to filter NgoSectors to count.
     * @example
     * // Count the number of NgoSectors
     * const count = await prisma.ngoSector.count({
     *   where: {
     *     // ... the filter for the NgoSectors we want to count
     *   }
     * })
    **/
    count<T extends NgoSectorCountArgs>(
      args?: Subset<T, NgoSectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NgoSectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NgoSector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NgoSectorAggregateArgs>(args: Subset<T, NgoSectorAggregateArgs>): Prisma.PrismaPromise<GetNgoSectorAggregateType<T>>

    /**
     * Group by NgoSector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NgoSectorGroupByArgs} args - Group by arguments.
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
      T extends NgoSectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NgoSectorGroupByArgs['orderBy'] }
        : { orderBy?: NgoSectorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NgoSectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNgoSectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NgoSector model
   */
  readonly fields: NgoSectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NgoSector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NgoSectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ngo<T extends NgoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NgoDefaultArgs<ExtArgs>>): Prisma__NgoClient<$Result.GetResult<Prisma.$NgoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sector<T extends SectorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectorDefaultArgs<ExtArgs>>): Prisma__SectorClient<$Result.GetResult<Prisma.$SectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NgoSector model
   */
  interface NgoSectorFieldRefs {
    readonly ngoId: FieldRef<"NgoSector", 'String'>
    readonly sectorId: FieldRef<"NgoSector", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * NgoSector findUnique
   */
  export type NgoSectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * Filter, which NgoSector to fetch.
     */
    where: NgoSectorWhereUniqueInput
  }

  /**
   * NgoSector findUniqueOrThrow
   */
  export type NgoSectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * Filter, which NgoSector to fetch.
     */
    where: NgoSectorWhereUniqueInput
  }

  /**
   * NgoSector findFirst
   */
  export type NgoSectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * Filter, which NgoSector to fetch.
     */
    where?: NgoSectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NgoSectors to fetch.
     */
    orderBy?: NgoSectorOrderByWithRelationInput | NgoSectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NgoSectors.
     */
    cursor?: NgoSectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NgoSectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NgoSectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NgoSectors.
     */
    distinct?: NgoSectorScalarFieldEnum | NgoSectorScalarFieldEnum[]
  }

  /**
   * NgoSector findFirstOrThrow
   */
  export type NgoSectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * Filter, which NgoSector to fetch.
     */
    where?: NgoSectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NgoSectors to fetch.
     */
    orderBy?: NgoSectorOrderByWithRelationInput | NgoSectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NgoSectors.
     */
    cursor?: NgoSectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NgoSectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NgoSectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NgoSectors.
     */
    distinct?: NgoSectorScalarFieldEnum | NgoSectorScalarFieldEnum[]
  }

  /**
   * NgoSector findMany
   */
  export type NgoSectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * Filter, which NgoSectors to fetch.
     */
    where?: NgoSectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NgoSectors to fetch.
     */
    orderBy?: NgoSectorOrderByWithRelationInput | NgoSectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NgoSectors.
     */
    cursor?: NgoSectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NgoSectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NgoSectors.
     */
    skip?: number
    distinct?: NgoSectorScalarFieldEnum | NgoSectorScalarFieldEnum[]
  }

  /**
   * NgoSector create
   */
  export type NgoSectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * The data needed to create a NgoSector.
     */
    data: XOR<NgoSectorCreateInput, NgoSectorUncheckedCreateInput>
  }

  /**
   * NgoSector createMany
   */
  export type NgoSectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NgoSectors.
     */
    data: NgoSectorCreateManyInput | NgoSectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NgoSector createManyAndReturn
   */
  export type NgoSectorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * The data used to create many NgoSectors.
     */
    data: NgoSectorCreateManyInput | NgoSectorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NgoSector update
   */
  export type NgoSectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * The data needed to update a NgoSector.
     */
    data: XOR<NgoSectorUpdateInput, NgoSectorUncheckedUpdateInput>
    /**
     * Choose, which NgoSector to update.
     */
    where: NgoSectorWhereUniqueInput
  }

  /**
   * NgoSector updateMany
   */
  export type NgoSectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NgoSectors.
     */
    data: XOR<NgoSectorUpdateManyMutationInput, NgoSectorUncheckedUpdateManyInput>
    /**
     * Filter which NgoSectors to update
     */
    where?: NgoSectorWhereInput
    /**
     * Limit how many NgoSectors to update.
     */
    limit?: number
  }

  /**
   * NgoSector updateManyAndReturn
   */
  export type NgoSectorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * The data used to update NgoSectors.
     */
    data: XOR<NgoSectorUpdateManyMutationInput, NgoSectorUncheckedUpdateManyInput>
    /**
     * Filter which NgoSectors to update
     */
    where?: NgoSectorWhereInput
    /**
     * Limit how many NgoSectors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NgoSector upsert
   */
  export type NgoSectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * The filter to search for the NgoSector to update in case it exists.
     */
    where: NgoSectorWhereUniqueInput
    /**
     * In case the NgoSector found by the `where` argument doesn't exist, create a new NgoSector with this data.
     */
    create: XOR<NgoSectorCreateInput, NgoSectorUncheckedCreateInput>
    /**
     * In case the NgoSector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NgoSectorUpdateInput, NgoSectorUncheckedUpdateInput>
  }

  /**
   * NgoSector delete
   */
  export type NgoSectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
    /**
     * Filter which NgoSector to delete.
     */
    where: NgoSectorWhereUniqueInput
  }

  /**
   * NgoSector deleteMany
   */
  export type NgoSectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NgoSectors to delete
     */
    where?: NgoSectorWhereInput
    /**
     * Limit how many NgoSectors to delete.
     */
    limit?: number
  }

  /**
   * NgoSector without action
   */
  export type NgoSectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NgoSector
     */
    select?: NgoSectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NgoSector
     */
    omit?: NgoSectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NgoSectorInclude<ExtArgs> | null
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


  export const NgoScalarFieldEnum: {
    id: 'id',
    darpanId: 'darpanId',
    name: 'name',
    normalizedName: 'normalizedName',
    serialNumber: 'serialNumber',
    registrationNumber: 'registrationNumber',
    registrationType: 'registrationType',
    registrationRaw: 'registrationRaw',
    email: 'email',
    phone: 'phone',
    mobile: 'mobile',
    website: 'website',
    summaryAddress: 'summaryAddress',
    address: 'address',
    district: 'district',
    state: 'state',
    pincode: 'pincode',
    darpanRegistrationDate: 'darpanRegistrationDate',
    registeredWith: 'registeredWith',
    typeOfNPO: 'typeOfNPO',
    actName: 'actName',
    cityOfRegistration: 'cityOfRegistration',
    stateOfRegistration: 'stateOfRegistration',
    dateOfRegistration: 'dateOfRegistration',
    registrationDate: 'registrationDate',
    summarySectors: 'summarySectors',
    primarySectors: 'primarySectors',
    secondarySectors: 'secondarySectors',
    operationalStates: 'operationalStates',
    operationalDistrict: 'operationalDistrict',
    officeBearers: 'officeBearers',
    latitude: 'latitude',
    longitude: 'longitude',
    geocodingStatus: 'geocodingStatus',
    geocodedPincode: 'geocodedPincode',
    exactGeocodeMatch: 'exactGeocodeMatch',
    accuracyLevel: 'accuracyLevel',
    sourceUrl: 'sourceUrl',
    scrapedAt: 'scrapedAt',
    hash: 'hash',
    raw: 'raw',
    rawScrapedDetails: 'rawScrapedDetails',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NgoScalarFieldEnum = (typeof NgoScalarFieldEnum)[keyof typeof NgoScalarFieldEnum]


  export const ScrapeRunScalarFieldEnum: {
    id: 'id',
    status: 'status',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    durationMs: 'durationMs',
    totalDiscovered: 'totalDiscovered',
    totalProcessed: 'totalProcessed',
    inserted: 'inserted',
    updated: 'updated',
    skipped: 'skipped',
    errors: 'errors',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type ScrapeRunScalarFieldEnum = (typeof ScrapeRunScalarFieldEnum)[keyof typeof ScrapeRunScalarFieldEnum]


  export const SectorScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SectorScalarFieldEnum = (typeof SectorScalarFieldEnum)[keyof typeof SectorScalarFieldEnum]


  export const NgoSectorScalarFieldEnum: {
    ngoId: 'ngoId',
    sectorId: 'sectorId'
  };

  export type NgoSectorScalarFieldEnum = (typeof NgoSectorScalarFieldEnum)[keyof typeof NgoSectorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


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


  export type NgoWhereInput = {
    AND?: NgoWhereInput | NgoWhereInput[]
    OR?: NgoWhereInput[]
    NOT?: NgoWhereInput | NgoWhereInput[]
    id?: UuidFilter<"Ngo"> | string
    darpanId?: StringNullableFilter<"Ngo"> | string | null
    name?: StringFilter<"Ngo"> | string
    normalizedName?: StringNullableFilter<"Ngo"> | string | null
    serialNumber?: StringNullableFilter<"Ngo"> | string | null
    registrationNumber?: StringNullableFilter<"Ngo"> | string | null
    registrationType?: StringNullableFilter<"Ngo"> | string | null
    registrationRaw?: StringNullableFilter<"Ngo"> | string | null
    email?: StringNullableFilter<"Ngo"> | string | null
    phone?: StringNullableFilter<"Ngo"> | string | null
    mobile?: StringNullableFilter<"Ngo"> | string | null
    website?: StringNullableFilter<"Ngo"> | string | null
    summaryAddress?: StringNullableFilter<"Ngo"> | string | null
    address?: StringNullableFilter<"Ngo"> | string | null
    district?: StringNullableFilter<"Ngo"> | string | null
    state?: StringNullableFilter<"Ngo"> | string | null
    pincode?: StringNullableFilter<"Ngo"> | string | null
    darpanRegistrationDate?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    registeredWith?: StringNullableFilter<"Ngo"> | string | null
    typeOfNPO?: StringNullableFilter<"Ngo"> | string | null
    actName?: StringNullableFilter<"Ngo"> | string | null
    cityOfRegistration?: StringNullableFilter<"Ngo"> | string | null
    stateOfRegistration?: StringNullableFilter<"Ngo"> | string | null
    dateOfRegistration?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    registrationDate?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    summarySectors?: StringNullableListFilter<"Ngo">
    primarySectors?: StringNullableListFilter<"Ngo">
    secondarySectors?: StringNullableListFilter<"Ngo">
    operationalStates?: StringNullableFilter<"Ngo"> | string | null
    operationalDistrict?: StringNullableFilter<"Ngo"> | string | null
    officeBearers?: JsonNullableFilter<"Ngo">
    latitude?: DecimalNullableFilter<"Ngo"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Ngo"> | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFilter<"Ngo"> | string
    geocodedPincode?: StringNullableFilter<"Ngo"> | string | null
    exactGeocodeMatch?: BoolNullableFilter<"Ngo"> | boolean | null
    accuracyLevel?: StringNullableFilter<"Ngo"> | string | null
    sourceUrl?: StringNullableFilter<"Ngo"> | string | null
    scrapedAt?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    hash?: StringNullableFilter<"Ngo"> | string | null
    raw?: JsonNullableFilter<"Ngo">
    rawScrapedDetails?: JsonNullableFilter<"Ngo">
    createdAt?: DateTimeFilter<"Ngo"> | Date | string
    updatedAt?: DateTimeFilter<"Ngo"> | Date | string
    sectors?: NgoSectorListRelationFilter
  }

  export type NgoOrderByWithRelationInput = {
    id?: SortOrder
    darpanId?: SortOrderInput | SortOrder
    name?: SortOrder
    normalizedName?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    registrationNumber?: SortOrderInput | SortOrder
    registrationType?: SortOrderInput | SortOrder
    registrationRaw?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    summaryAddress?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    darpanRegistrationDate?: SortOrderInput | SortOrder
    registeredWith?: SortOrderInput | SortOrder
    typeOfNPO?: SortOrderInput | SortOrder
    actName?: SortOrderInput | SortOrder
    cityOfRegistration?: SortOrderInput | SortOrder
    stateOfRegistration?: SortOrderInput | SortOrder
    dateOfRegistration?: SortOrderInput | SortOrder
    registrationDate?: SortOrderInput | SortOrder
    summarySectors?: SortOrder
    primarySectors?: SortOrder
    secondarySectors?: SortOrder
    operationalStates?: SortOrderInput | SortOrder
    operationalDistrict?: SortOrderInput | SortOrder
    officeBearers?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    geocodingStatus?: SortOrder
    geocodedPincode?: SortOrderInput | SortOrder
    exactGeocodeMatch?: SortOrderInput | SortOrder
    accuracyLevel?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    scrapedAt?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    rawScrapedDetails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sectors?: NgoSectorOrderByRelationAggregateInput
  }

  export type NgoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    darpanId?: string
    AND?: NgoWhereInput | NgoWhereInput[]
    OR?: NgoWhereInput[]
    NOT?: NgoWhereInput | NgoWhereInput[]
    name?: StringFilter<"Ngo"> | string
    normalizedName?: StringNullableFilter<"Ngo"> | string | null
    serialNumber?: StringNullableFilter<"Ngo"> | string | null
    registrationNumber?: StringNullableFilter<"Ngo"> | string | null
    registrationType?: StringNullableFilter<"Ngo"> | string | null
    registrationRaw?: StringNullableFilter<"Ngo"> | string | null
    email?: StringNullableFilter<"Ngo"> | string | null
    phone?: StringNullableFilter<"Ngo"> | string | null
    mobile?: StringNullableFilter<"Ngo"> | string | null
    website?: StringNullableFilter<"Ngo"> | string | null
    summaryAddress?: StringNullableFilter<"Ngo"> | string | null
    address?: StringNullableFilter<"Ngo"> | string | null
    district?: StringNullableFilter<"Ngo"> | string | null
    state?: StringNullableFilter<"Ngo"> | string | null
    pincode?: StringNullableFilter<"Ngo"> | string | null
    darpanRegistrationDate?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    registeredWith?: StringNullableFilter<"Ngo"> | string | null
    typeOfNPO?: StringNullableFilter<"Ngo"> | string | null
    actName?: StringNullableFilter<"Ngo"> | string | null
    cityOfRegistration?: StringNullableFilter<"Ngo"> | string | null
    stateOfRegistration?: StringNullableFilter<"Ngo"> | string | null
    dateOfRegistration?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    registrationDate?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    summarySectors?: StringNullableListFilter<"Ngo">
    primarySectors?: StringNullableListFilter<"Ngo">
    secondarySectors?: StringNullableListFilter<"Ngo">
    operationalStates?: StringNullableFilter<"Ngo"> | string | null
    operationalDistrict?: StringNullableFilter<"Ngo"> | string | null
    officeBearers?: JsonNullableFilter<"Ngo">
    latitude?: DecimalNullableFilter<"Ngo"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"Ngo"> | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFilter<"Ngo"> | string
    geocodedPincode?: StringNullableFilter<"Ngo"> | string | null
    exactGeocodeMatch?: BoolNullableFilter<"Ngo"> | boolean | null
    accuracyLevel?: StringNullableFilter<"Ngo"> | string | null
    sourceUrl?: StringNullableFilter<"Ngo"> | string | null
    scrapedAt?: DateTimeNullableFilter<"Ngo"> | Date | string | null
    hash?: StringNullableFilter<"Ngo"> | string | null
    raw?: JsonNullableFilter<"Ngo">
    rawScrapedDetails?: JsonNullableFilter<"Ngo">
    createdAt?: DateTimeFilter<"Ngo"> | Date | string
    updatedAt?: DateTimeFilter<"Ngo"> | Date | string
    sectors?: NgoSectorListRelationFilter
  }, "id" | "darpanId">

  export type NgoOrderByWithAggregationInput = {
    id?: SortOrder
    darpanId?: SortOrderInput | SortOrder
    name?: SortOrder
    normalizedName?: SortOrderInput | SortOrder
    serialNumber?: SortOrderInput | SortOrder
    registrationNumber?: SortOrderInput | SortOrder
    registrationType?: SortOrderInput | SortOrder
    registrationRaw?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    mobile?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    summaryAddress?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    pincode?: SortOrderInput | SortOrder
    darpanRegistrationDate?: SortOrderInput | SortOrder
    registeredWith?: SortOrderInput | SortOrder
    typeOfNPO?: SortOrderInput | SortOrder
    actName?: SortOrderInput | SortOrder
    cityOfRegistration?: SortOrderInput | SortOrder
    stateOfRegistration?: SortOrderInput | SortOrder
    dateOfRegistration?: SortOrderInput | SortOrder
    registrationDate?: SortOrderInput | SortOrder
    summarySectors?: SortOrder
    primarySectors?: SortOrder
    secondarySectors?: SortOrder
    operationalStates?: SortOrderInput | SortOrder
    operationalDistrict?: SortOrderInput | SortOrder
    officeBearers?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    geocodingStatus?: SortOrder
    geocodedPincode?: SortOrderInput | SortOrder
    exactGeocodeMatch?: SortOrderInput | SortOrder
    accuracyLevel?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    scrapedAt?: SortOrderInput | SortOrder
    hash?: SortOrderInput | SortOrder
    raw?: SortOrderInput | SortOrder
    rawScrapedDetails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NgoCountOrderByAggregateInput
    _avg?: NgoAvgOrderByAggregateInput
    _max?: NgoMaxOrderByAggregateInput
    _min?: NgoMinOrderByAggregateInput
    _sum?: NgoSumOrderByAggregateInput
  }

  export type NgoScalarWhereWithAggregatesInput = {
    AND?: NgoScalarWhereWithAggregatesInput | NgoScalarWhereWithAggregatesInput[]
    OR?: NgoScalarWhereWithAggregatesInput[]
    NOT?: NgoScalarWhereWithAggregatesInput | NgoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Ngo"> | string
    darpanId?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    name?: StringWithAggregatesFilter<"Ngo"> | string
    normalizedName?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    serialNumber?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    registrationNumber?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    registrationType?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    registrationRaw?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    email?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    mobile?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    website?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    summaryAddress?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    address?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    district?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    state?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    pincode?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    darpanRegistrationDate?: DateTimeNullableWithAggregatesFilter<"Ngo"> | Date | string | null
    registeredWith?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    typeOfNPO?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    actName?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    cityOfRegistration?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    stateOfRegistration?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    dateOfRegistration?: DateTimeNullableWithAggregatesFilter<"Ngo"> | Date | string | null
    registrationDate?: DateTimeNullableWithAggregatesFilter<"Ngo"> | Date | string | null
    summarySectors?: StringNullableListFilter<"Ngo">
    primarySectors?: StringNullableListFilter<"Ngo">
    secondarySectors?: StringNullableListFilter<"Ngo">
    operationalStates?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    operationalDistrict?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    officeBearers?: JsonNullableWithAggregatesFilter<"Ngo">
    latitude?: DecimalNullableWithAggregatesFilter<"Ngo"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableWithAggregatesFilter<"Ngo"> | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringWithAggregatesFilter<"Ngo"> | string
    geocodedPincode?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    exactGeocodeMatch?: BoolNullableWithAggregatesFilter<"Ngo"> | boolean | null
    accuracyLevel?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    sourceUrl?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    scrapedAt?: DateTimeNullableWithAggregatesFilter<"Ngo"> | Date | string | null
    hash?: StringNullableWithAggregatesFilter<"Ngo"> | string | null
    raw?: JsonNullableWithAggregatesFilter<"Ngo">
    rawScrapedDetails?: JsonNullableWithAggregatesFilter<"Ngo">
    createdAt?: DateTimeWithAggregatesFilter<"Ngo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ngo"> | Date | string
  }

  export type ScrapeRunWhereInput = {
    AND?: ScrapeRunWhereInput | ScrapeRunWhereInput[]
    OR?: ScrapeRunWhereInput[]
    NOT?: ScrapeRunWhereInput | ScrapeRunWhereInput[]
    id?: UuidFilter<"ScrapeRun"> | string
    status?: StringFilter<"ScrapeRun"> | string
    startedAt?: DateTimeFilter<"ScrapeRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ScrapeRun"> | Date | string | null
    durationMs?: IntNullableFilter<"ScrapeRun"> | number | null
    totalDiscovered?: IntNullableFilter<"ScrapeRun"> | number | null
    totalProcessed?: IntNullableFilter<"ScrapeRun"> | number | null
    inserted?: IntNullableFilter<"ScrapeRun"> | number | null
    updated?: IntNullableFilter<"ScrapeRun"> | number | null
    skipped?: IntNullableFilter<"ScrapeRun"> | number | null
    errors?: JsonNullableFilter<"ScrapeRun">
    message?: StringNullableFilter<"ScrapeRun"> | string | null
    createdAt?: DateTimeFilter<"ScrapeRun"> | Date | string
  }

  export type ScrapeRunOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    totalDiscovered?: SortOrderInput | SortOrder
    totalProcessed?: SortOrderInput | SortOrder
    inserted?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    skipped?: SortOrderInput | SortOrder
    errors?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ScrapeRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScrapeRunWhereInput | ScrapeRunWhereInput[]
    OR?: ScrapeRunWhereInput[]
    NOT?: ScrapeRunWhereInput | ScrapeRunWhereInput[]
    status?: StringFilter<"ScrapeRun"> | string
    startedAt?: DateTimeFilter<"ScrapeRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ScrapeRun"> | Date | string | null
    durationMs?: IntNullableFilter<"ScrapeRun"> | number | null
    totalDiscovered?: IntNullableFilter<"ScrapeRun"> | number | null
    totalProcessed?: IntNullableFilter<"ScrapeRun"> | number | null
    inserted?: IntNullableFilter<"ScrapeRun"> | number | null
    updated?: IntNullableFilter<"ScrapeRun"> | number | null
    skipped?: IntNullableFilter<"ScrapeRun"> | number | null
    errors?: JsonNullableFilter<"ScrapeRun">
    message?: StringNullableFilter<"ScrapeRun"> | string | null
    createdAt?: DateTimeFilter<"ScrapeRun"> | Date | string
  }, "id">

  export type ScrapeRunOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    totalDiscovered?: SortOrderInput | SortOrder
    totalProcessed?: SortOrderInput | SortOrder
    inserted?: SortOrderInput | SortOrder
    updated?: SortOrderInput | SortOrder
    skipped?: SortOrderInput | SortOrder
    errors?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ScrapeRunCountOrderByAggregateInput
    _avg?: ScrapeRunAvgOrderByAggregateInput
    _max?: ScrapeRunMaxOrderByAggregateInput
    _min?: ScrapeRunMinOrderByAggregateInput
    _sum?: ScrapeRunSumOrderByAggregateInput
  }

  export type ScrapeRunScalarWhereWithAggregatesInput = {
    AND?: ScrapeRunScalarWhereWithAggregatesInput | ScrapeRunScalarWhereWithAggregatesInput[]
    OR?: ScrapeRunScalarWhereWithAggregatesInput[]
    NOT?: ScrapeRunScalarWhereWithAggregatesInput | ScrapeRunScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ScrapeRun"> | string
    status?: StringWithAggregatesFilter<"ScrapeRun"> | string
    startedAt?: DateTimeWithAggregatesFilter<"ScrapeRun"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"ScrapeRun"> | Date | string | null
    durationMs?: IntNullableWithAggregatesFilter<"ScrapeRun"> | number | null
    totalDiscovered?: IntNullableWithAggregatesFilter<"ScrapeRun"> | number | null
    totalProcessed?: IntNullableWithAggregatesFilter<"ScrapeRun"> | number | null
    inserted?: IntNullableWithAggregatesFilter<"ScrapeRun"> | number | null
    updated?: IntNullableWithAggregatesFilter<"ScrapeRun"> | number | null
    skipped?: IntNullableWithAggregatesFilter<"ScrapeRun"> | number | null
    errors?: JsonNullableWithAggregatesFilter<"ScrapeRun">
    message?: StringNullableWithAggregatesFilter<"ScrapeRun"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ScrapeRun"> | Date | string
  }

  export type SectorWhereInput = {
    AND?: SectorWhereInput | SectorWhereInput[]
    OR?: SectorWhereInput[]
    NOT?: SectorWhereInput | SectorWhereInput[]
    id?: BigIntFilter<"Sector"> | bigint | number
    name?: StringFilter<"Sector"> | string
    ngos?: NgoSectorListRelationFilter
  }

  export type SectorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ngos?: NgoSectorOrderByRelationAggregateInput
  }

  export type SectorWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    name?: string
    AND?: SectorWhereInput | SectorWhereInput[]
    OR?: SectorWhereInput[]
    NOT?: SectorWhereInput | SectorWhereInput[]
    ngos?: NgoSectorListRelationFilter
  }, "id" | "name">

  export type SectorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: SectorCountOrderByAggregateInput
    _avg?: SectorAvgOrderByAggregateInput
    _max?: SectorMaxOrderByAggregateInput
    _min?: SectorMinOrderByAggregateInput
    _sum?: SectorSumOrderByAggregateInput
  }

  export type SectorScalarWhereWithAggregatesInput = {
    AND?: SectorScalarWhereWithAggregatesInput | SectorScalarWhereWithAggregatesInput[]
    OR?: SectorScalarWhereWithAggregatesInput[]
    NOT?: SectorScalarWhereWithAggregatesInput | SectorScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Sector"> | bigint | number
    name?: StringWithAggregatesFilter<"Sector"> | string
  }

  export type NgoSectorWhereInput = {
    AND?: NgoSectorWhereInput | NgoSectorWhereInput[]
    OR?: NgoSectorWhereInput[]
    NOT?: NgoSectorWhereInput | NgoSectorWhereInput[]
    ngoId?: UuidFilter<"NgoSector"> | string
    sectorId?: BigIntFilter<"NgoSector"> | bigint | number
    ngo?: XOR<NgoScalarRelationFilter, NgoWhereInput>
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
  }

  export type NgoSectorOrderByWithRelationInput = {
    ngoId?: SortOrder
    sectorId?: SortOrder
    ngo?: NgoOrderByWithRelationInput
    sector?: SectorOrderByWithRelationInput
  }

  export type NgoSectorWhereUniqueInput = Prisma.AtLeast<{
    ngoId_sectorId?: NgoSectorNgoIdSectorIdCompoundUniqueInput
    AND?: NgoSectorWhereInput | NgoSectorWhereInput[]
    OR?: NgoSectorWhereInput[]
    NOT?: NgoSectorWhereInput | NgoSectorWhereInput[]
    ngoId?: UuidFilter<"NgoSector"> | string
    sectorId?: BigIntFilter<"NgoSector"> | bigint | number
    ngo?: XOR<NgoScalarRelationFilter, NgoWhereInput>
    sector?: XOR<SectorScalarRelationFilter, SectorWhereInput>
  }, "ngoId_sectorId">

  export type NgoSectorOrderByWithAggregationInput = {
    ngoId?: SortOrder
    sectorId?: SortOrder
    _count?: NgoSectorCountOrderByAggregateInput
    _avg?: NgoSectorAvgOrderByAggregateInput
    _max?: NgoSectorMaxOrderByAggregateInput
    _min?: NgoSectorMinOrderByAggregateInput
    _sum?: NgoSectorSumOrderByAggregateInput
  }

  export type NgoSectorScalarWhereWithAggregatesInput = {
    AND?: NgoSectorScalarWhereWithAggregatesInput | NgoSectorScalarWhereWithAggregatesInput[]
    OR?: NgoSectorScalarWhereWithAggregatesInput[]
    NOT?: NgoSectorScalarWhereWithAggregatesInput | NgoSectorScalarWhereWithAggregatesInput[]
    ngoId?: UuidWithAggregatesFilter<"NgoSector"> | string
    sectorId?: BigIntWithAggregatesFilter<"NgoSector"> | bigint | number
  }

  export type NgoCreateInput = {
    id?: string
    darpanId?: string | null
    name: string
    normalizedName?: string | null
    serialNumber?: string | null
    registrationNumber?: string | null
    registrationType?: string | null
    registrationRaw?: string | null
    email?: string | null
    phone?: string | null
    mobile?: string | null
    website?: string | null
    summaryAddress?: string | null
    address?: string | null
    district?: string | null
    state?: string | null
    pincode?: string | null
    darpanRegistrationDate?: Date | string | null
    registeredWith?: string | null
    typeOfNPO?: string | null
    actName?: string | null
    cityOfRegistration?: string | null
    stateOfRegistration?: string | null
    dateOfRegistration?: Date | string | null
    registrationDate?: Date | string | null
    summarySectors?: NgoCreatesummarySectorsInput | string[]
    primarySectors?: NgoCreateprimarySectorsInput | string[]
    secondarySectors?: NgoCreatesecondarySectorsInput | string[]
    operationalStates?: string | null
    operationalDistrict?: string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: string
    geocodedPincode?: string | null
    exactGeocodeMatch?: boolean | null
    accuracyLevel?: string | null
    sourceUrl?: string | null
    scrapedAt?: Date | string | null
    hash?: string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sectors?: NgoSectorCreateNestedManyWithoutNgoInput
  }

  export type NgoUncheckedCreateInput = {
    id?: string
    darpanId?: string | null
    name: string
    normalizedName?: string | null
    serialNumber?: string | null
    registrationNumber?: string | null
    registrationType?: string | null
    registrationRaw?: string | null
    email?: string | null
    phone?: string | null
    mobile?: string | null
    website?: string | null
    summaryAddress?: string | null
    address?: string | null
    district?: string | null
    state?: string | null
    pincode?: string | null
    darpanRegistrationDate?: Date | string | null
    registeredWith?: string | null
    typeOfNPO?: string | null
    actName?: string | null
    cityOfRegistration?: string | null
    stateOfRegistration?: string | null
    dateOfRegistration?: Date | string | null
    registrationDate?: Date | string | null
    summarySectors?: NgoCreatesummarySectorsInput | string[]
    primarySectors?: NgoCreateprimarySectorsInput | string[]
    secondarySectors?: NgoCreatesecondarySectorsInput | string[]
    operationalStates?: string | null
    operationalDistrict?: string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: string
    geocodedPincode?: string | null
    exactGeocodeMatch?: boolean | null
    accuracyLevel?: string | null
    sourceUrl?: string | null
    scrapedAt?: Date | string | null
    hash?: string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sectors?: NgoSectorUncheckedCreateNestedManyWithoutNgoInput
  }

  export type NgoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    darpanId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationType?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRaw?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    darpanRegistrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registeredWith?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfNPO?: NullableStringFieldUpdateOperationsInput | string | null
    actName?: NullableStringFieldUpdateOperationsInput | string | null
    cityOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    stateOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfRegistration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    summarySectors?: NgoUpdatesummarySectorsInput | string[]
    primarySectors?: NgoUpdateprimarySectorsInput | string[]
    secondarySectors?: NgoUpdatesecondarySectorsInput | string[]
    operationalStates?: NullableStringFieldUpdateOperationsInput | string | null
    operationalDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFieldUpdateOperationsInput | string
    geocodedPincode?: NullableStringFieldUpdateOperationsInput | string | null
    exactGeocodeMatch?: NullableBoolFieldUpdateOperationsInput | boolean | null
    accuracyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    scrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectors?: NgoSectorUpdateManyWithoutNgoNestedInput
  }

  export type NgoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    darpanId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationType?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRaw?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    darpanRegistrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registeredWith?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfNPO?: NullableStringFieldUpdateOperationsInput | string | null
    actName?: NullableStringFieldUpdateOperationsInput | string | null
    cityOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    stateOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfRegistration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    summarySectors?: NgoUpdatesummarySectorsInput | string[]
    primarySectors?: NgoUpdateprimarySectorsInput | string[]
    secondarySectors?: NgoUpdatesecondarySectorsInput | string[]
    operationalStates?: NullableStringFieldUpdateOperationsInput | string | null
    operationalDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFieldUpdateOperationsInput | string
    geocodedPincode?: NullableStringFieldUpdateOperationsInput | string | null
    exactGeocodeMatch?: NullableBoolFieldUpdateOperationsInput | boolean | null
    accuracyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    scrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectors?: NgoSectorUncheckedUpdateManyWithoutNgoNestedInput
  }

  export type NgoCreateManyInput = {
    id?: string
    darpanId?: string | null
    name: string
    normalizedName?: string | null
    serialNumber?: string | null
    registrationNumber?: string | null
    registrationType?: string | null
    registrationRaw?: string | null
    email?: string | null
    phone?: string | null
    mobile?: string | null
    website?: string | null
    summaryAddress?: string | null
    address?: string | null
    district?: string | null
    state?: string | null
    pincode?: string | null
    darpanRegistrationDate?: Date | string | null
    registeredWith?: string | null
    typeOfNPO?: string | null
    actName?: string | null
    cityOfRegistration?: string | null
    stateOfRegistration?: string | null
    dateOfRegistration?: Date | string | null
    registrationDate?: Date | string | null
    summarySectors?: NgoCreatesummarySectorsInput | string[]
    primarySectors?: NgoCreateprimarySectorsInput | string[]
    secondarySectors?: NgoCreatesecondarySectorsInput | string[]
    operationalStates?: string | null
    operationalDistrict?: string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: string
    geocodedPincode?: string | null
    exactGeocodeMatch?: boolean | null
    accuracyLevel?: string | null
    sourceUrl?: string | null
    scrapedAt?: Date | string | null
    hash?: string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NgoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    darpanId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationType?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRaw?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    darpanRegistrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registeredWith?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfNPO?: NullableStringFieldUpdateOperationsInput | string | null
    actName?: NullableStringFieldUpdateOperationsInput | string | null
    cityOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    stateOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfRegistration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    summarySectors?: NgoUpdatesummarySectorsInput | string[]
    primarySectors?: NgoUpdateprimarySectorsInput | string[]
    secondarySectors?: NgoUpdatesecondarySectorsInput | string[]
    operationalStates?: NullableStringFieldUpdateOperationsInput | string | null
    operationalDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFieldUpdateOperationsInput | string
    geocodedPincode?: NullableStringFieldUpdateOperationsInput | string | null
    exactGeocodeMatch?: NullableBoolFieldUpdateOperationsInput | boolean | null
    accuracyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    scrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NgoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    darpanId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationType?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRaw?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    darpanRegistrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registeredWith?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfNPO?: NullableStringFieldUpdateOperationsInput | string | null
    actName?: NullableStringFieldUpdateOperationsInput | string | null
    cityOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    stateOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfRegistration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    summarySectors?: NgoUpdatesummarySectorsInput | string[]
    primarySectors?: NgoUpdateprimarySectorsInput | string[]
    secondarySectors?: NgoUpdatesecondarySectorsInput | string[]
    operationalStates?: NullableStringFieldUpdateOperationsInput | string | null
    operationalDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFieldUpdateOperationsInput | string
    geocodedPincode?: NullableStringFieldUpdateOperationsInput | string | null
    exactGeocodeMatch?: NullableBoolFieldUpdateOperationsInput | boolean | null
    accuracyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    scrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapeRunCreateInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    durationMs?: number | null
    totalDiscovered?: number | null
    totalProcessed?: number | null
    inserted?: number | null
    updated?: number | null
    skipped?: number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: string | null
    createdAt?: Date | string
  }

  export type ScrapeRunUncheckedCreateInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    durationMs?: number | null
    totalDiscovered?: number | null
    totalProcessed?: number | null
    inserted?: number | null
    updated?: number | null
    skipped?: number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: string | null
    createdAt?: Date | string
  }

  export type ScrapeRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    totalDiscovered?: NullableIntFieldUpdateOperationsInput | number | null
    totalProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    inserted?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableIntFieldUpdateOperationsInput | number | null
    skipped?: NullableIntFieldUpdateOperationsInput | number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapeRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    totalDiscovered?: NullableIntFieldUpdateOperationsInput | number | null
    totalProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    inserted?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableIntFieldUpdateOperationsInput | number | null
    skipped?: NullableIntFieldUpdateOperationsInput | number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapeRunCreateManyInput = {
    id?: string
    status: string
    startedAt?: Date | string
    finishedAt?: Date | string | null
    durationMs?: number | null
    totalDiscovered?: number | null
    totalProcessed?: number | null
    inserted?: number | null
    updated?: number | null
    skipped?: number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: string | null
    createdAt?: Date | string
  }

  export type ScrapeRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    totalDiscovered?: NullableIntFieldUpdateOperationsInput | number | null
    totalProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    inserted?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableIntFieldUpdateOperationsInput | number | null
    skipped?: NullableIntFieldUpdateOperationsInput | number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScrapeRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    totalDiscovered?: NullableIntFieldUpdateOperationsInput | number | null
    totalProcessed?: NullableIntFieldUpdateOperationsInput | number | null
    inserted?: NullableIntFieldUpdateOperationsInput | number | null
    updated?: NullableIntFieldUpdateOperationsInput | number | null
    skipped?: NullableIntFieldUpdateOperationsInput | number | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorCreateInput = {
    id?: bigint | number
    name: string
    ngos?: NgoSectorCreateNestedManyWithoutSectorInput
  }

  export type SectorUncheckedCreateInput = {
    id?: bigint | number
    name: string
    ngos?: NgoSectorUncheckedCreateNestedManyWithoutSectorInput
  }

  export type SectorUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    ngos?: NgoSectorUpdateManyWithoutSectorNestedInput
  }

  export type SectorUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    ngos?: NgoSectorUncheckedUpdateManyWithoutSectorNestedInput
  }

  export type SectorCreateManyInput = {
    id?: bigint | number
    name: string
  }

  export type SectorUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SectorUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NgoSectorCreateInput = {
    ngo: NgoCreateNestedOneWithoutSectorsInput
    sector: SectorCreateNestedOneWithoutNgosInput
  }

  export type NgoSectorUncheckedCreateInput = {
    ngoId: string
    sectorId: bigint | number
  }

  export type NgoSectorUpdateInput = {
    ngo?: NgoUpdateOneRequiredWithoutSectorsNestedInput
    sector?: SectorUpdateOneRequiredWithoutNgosNestedInput
  }

  export type NgoSectorUncheckedUpdateInput = {
    ngoId?: StringFieldUpdateOperationsInput | string
    sectorId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type NgoSectorCreateManyInput = {
    ngoId: string
    sectorId: bigint | number
  }

  export type NgoSectorUpdateManyMutationInput = {

  }

  export type NgoSectorUncheckedUpdateManyInput = {
    ngoId?: StringFieldUpdateOperationsInput | string
    sectorId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NgoSectorListRelationFilter = {
    every?: NgoSectorWhereInput
    some?: NgoSectorWhereInput
    none?: NgoSectorWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NgoSectorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NgoCountOrderByAggregateInput = {
    id?: SortOrder
    darpanId?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    serialNumber?: SortOrder
    registrationNumber?: SortOrder
    registrationType?: SortOrder
    registrationRaw?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    mobile?: SortOrder
    website?: SortOrder
    summaryAddress?: SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    darpanRegistrationDate?: SortOrder
    registeredWith?: SortOrder
    typeOfNPO?: SortOrder
    actName?: SortOrder
    cityOfRegistration?: SortOrder
    stateOfRegistration?: SortOrder
    dateOfRegistration?: SortOrder
    registrationDate?: SortOrder
    summarySectors?: SortOrder
    primarySectors?: SortOrder
    secondarySectors?: SortOrder
    operationalStates?: SortOrder
    operationalDistrict?: SortOrder
    officeBearers?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geocodingStatus?: SortOrder
    geocodedPincode?: SortOrder
    exactGeocodeMatch?: SortOrder
    accuracyLevel?: SortOrder
    sourceUrl?: SortOrder
    scrapedAt?: SortOrder
    hash?: SortOrder
    raw?: SortOrder
    rawScrapedDetails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NgoAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type NgoMaxOrderByAggregateInput = {
    id?: SortOrder
    darpanId?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    serialNumber?: SortOrder
    registrationNumber?: SortOrder
    registrationType?: SortOrder
    registrationRaw?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    mobile?: SortOrder
    website?: SortOrder
    summaryAddress?: SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    darpanRegistrationDate?: SortOrder
    registeredWith?: SortOrder
    typeOfNPO?: SortOrder
    actName?: SortOrder
    cityOfRegistration?: SortOrder
    stateOfRegistration?: SortOrder
    dateOfRegistration?: SortOrder
    registrationDate?: SortOrder
    operationalStates?: SortOrder
    operationalDistrict?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geocodingStatus?: SortOrder
    geocodedPincode?: SortOrder
    exactGeocodeMatch?: SortOrder
    accuracyLevel?: SortOrder
    sourceUrl?: SortOrder
    scrapedAt?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NgoMinOrderByAggregateInput = {
    id?: SortOrder
    darpanId?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    serialNumber?: SortOrder
    registrationNumber?: SortOrder
    registrationType?: SortOrder
    registrationRaw?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    mobile?: SortOrder
    website?: SortOrder
    summaryAddress?: SortOrder
    address?: SortOrder
    district?: SortOrder
    state?: SortOrder
    pincode?: SortOrder
    darpanRegistrationDate?: SortOrder
    registeredWith?: SortOrder
    typeOfNPO?: SortOrder
    actName?: SortOrder
    cityOfRegistration?: SortOrder
    stateOfRegistration?: SortOrder
    dateOfRegistration?: SortOrder
    registrationDate?: SortOrder
    operationalStates?: SortOrder
    operationalDistrict?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geocodingStatus?: SortOrder
    geocodedPincode?: SortOrder
    exactGeocodeMatch?: SortOrder
    accuracyLevel?: SortOrder
    sourceUrl?: SortOrder
    scrapedAt?: SortOrder
    hash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NgoSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
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

  export type ScrapeRunCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    durationMs?: SortOrder
    totalDiscovered?: SortOrder
    totalProcessed?: SortOrder
    inserted?: SortOrder
    updated?: SortOrder
    skipped?: SortOrder
    errors?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ScrapeRunAvgOrderByAggregateInput = {
    durationMs?: SortOrder
    totalDiscovered?: SortOrder
    totalProcessed?: SortOrder
    inserted?: SortOrder
    updated?: SortOrder
    skipped?: SortOrder
  }

  export type ScrapeRunMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    durationMs?: SortOrder
    totalDiscovered?: SortOrder
    totalProcessed?: SortOrder
    inserted?: SortOrder
    updated?: SortOrder
    skipped?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ScrapeRunMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    durationMs?: SortOrder
    totalDiscovered?: SortOrder
    totalProcessed?: SortOrder
    inserted?: SortOrder
    updated?: SortOrder
    skipped?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ScrapeRunSumOrderByAggregateInput = {
    durationMs?: SortOrder
    totalDiscovered?: SortOrder
    totalProcessed?: SortOrder
    inserted?: SortOrder
    updated?: SortOrder
    skipped?: SortOrder
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

  export type SectorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SectorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SectorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SectorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SectorSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type NgoScalarRelationFilter = {
    is?: NgoWhereInput
    isNot?: NgoWhereInput
  }

  export type SectorScalarRelationFilter = {
    is?: SectorWhereInput
    isNot?: SectorWhereInput
  }

  export type NgoSectorNgoIdSectorIdCompoundUniqueInput = {
    ngoId: string
    sectorId: bigint | number
  }

  export type NgoSectorCountOrderByAggregateInput = {
    ngoId?: SortOrder
    sectorId?: SortOrder
  }

  export type NgoSectorAvgOrderByAggregateInput = {
    sectorId?: SortOrder
  }

  export type NgoSectorMaxOrderByAggregateInput = {
    ngoId?: SortOrder
    sectorId?: SortOrder
  }

  export type NgoSectorMinOrderByAggregateInput = {
    ngoId?: SortOrder
    sectorId?: SortOrder
  }

  export type NgoSectorSumOrderByAggregateInput = {
    sectorId?: SortOrder
  }

  export type NgoCreatesummarySectorsInput = {
    set: string[]
  }

  export type NgoCreateprimarySectorsInput = {
    set: string[]
  }

  export type NgoCreatesecondarySectorsInput = {
    set: string[]
  }

  export type NgoSectorCreateNestedManyWithoutNgoInput = {
    create?: XOR<NgoSectorCreateWithoutNgoInput, NgoSectorUncheckedCreateWithoutNgoInput> | NgoSectorCreateWithoutNgoInput[] | NgoSectorUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutNgoInput | NgoSectorCreateOrConnectWithoutNgoInput[]
    createMany?: NgoSectorCreateManyNgoInputEnvelope
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
  }

  export type NgoSectorUncheckedCreateNestedManyWithoutNgoInput = {
    create?: XOR<NgoSectorCreateWithoutNgoInput, NgoSectorUncheckedCreateWithoutNgoInput> | NgoSectorCreateWithoutNgoInput[] | NgoSectorUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutNgoInput | NgoSectorCreateOrConnectWithoutNgoInput[]
    createMany?: NgoSectorCreateManyNgoInputEnvelope
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NgoUpdatesummarySectorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NgoUpdateprimarySectorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NgoUpdatesecondarySectorsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NgoSectorUpdateManyWithoutNgoNestedInput = {
    create?: XOR<NgoSectorCreateWithoutNgoInput, NgoSectorUncheckedCreateWithoutNgoInput> | NgoSectorCreateWithoutNgoInput[] | NgoSectorUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutNgoInput | NgoSectorCreateOrConnectWithoutNgoInput[]
    upsert?: NgoSectorUpsertWithWhereUniqueWithoutNgoInput | NgoSectorUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: NgoSectorCreateManyNgoInputEnvelope
    set?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    disconnect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    delete?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    update?: NgoSectorUpdateWithWhereUniqueWithoutNgoInput | NgoSectorUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: NgoSectorUpdateManyWithWhereWithoutNgoInput | NgoSectorUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: NgoSectorScalarWhereInput | NgoSectorScalarWhereInput[]
  }

  export type NgoSectorUncheckedUpdateManyWithoutNgoNestedInput = {
    create?: XOR<NgoSectorCreateWithoutNgoInput, NgoSectorUncheckedCreateWithoutNgoInput> | NgoSectorCreateWithoutNgoInput[] | NgoSectorUncheckedCreateWithoutNgoInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutNgoInput | NgoSectorCreateOrConnectWithoutNgoInput[]
    upsert?: NgoSectorUpsertWithWhereUniqueWithoutNgoInput | NgoSectorUpsertWithWhereUniqueWithoutNgoInput[]
    createMany?: NgoSectorCreateManyNgoInputEnvelope
    set?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    disconnect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    delete?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    update?: NgoSectorUpdateWithWhereUniqueWithoutNgoInput | NgoSectorUpdateWithWhereUniqueWithoutNgoInput[]
    updateMany?: NgoSectorUpdateManyWithWhereWithoutNgoInput | NgoSectorUpdateManyWithWhereWithoutNgoInput[]
    deleteMany?: NgoSectorScalarWhereInput | NgoSectorScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NgoSectorCreateNestedManyWithoutSectorInput = {
    create?: XOR<NgoSectorCreateWithoutSectorInput, NgoSectorUncheckedCreateWithoutSectorInput> | NgoSectorCreateWithoutSectorInput[] | NgoSectorUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutSectorInput | NgoSectorCreateOrConnectWithoutSectorInput[]
    createMany?: NgoSectorCreateManySectorInputEnvelope
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
  }

  export type NgoSectorUncheckedCreateNestedManyWithoutSectorInput = {
    create?: XOR<NgoSectorCreateWithoutSectorInput, NgoSectorUncheckedCreateWithoutSectorInput> | NgoSectorCreateWithoutSectorInput[] | NgoSectorUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutSectorInput | NgoSectorCreateOrConnectWithoutSectorInput[]
    createMany?: NgoSectorCreateManySectorInputEnvelope
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NgoSectorUpdateManyWithoutSectorNestedInput = {
    create?: XOR<NgoSectorCreateWithoutSectorInput, NgoSectorUncheckedCreateWithoutSectorInput> | NgoSectorCreateWithoutSectorInput[] | NgoSectorUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutSectorInput | NgoSectorCreateOrConnectWithoutSectorInput[]
    upsert?: NgoSectorUpsertWithWhereUniqueWithoutSectorInput | NgoSectorUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: NgoSectorCreateManySectorInputEnvelope
    set?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    disconnect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    delete?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    update?: NgoSectorUpdateWithWhereUniqueWithoutSectorInput | NgoSectorUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: NgoSectorUpdateManyWithWhereWithoutSectorInput | NgoSectorUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: NgoSectorScalarWhereInput | NgoSectorScalarWhereInput[]
  }

  export type NgoSectorUncheckedUpdateManyWithoutSectorNestedInput = {
    create?: XOR<NgoSectorCreateWithoutSectorInput, NgoSectorUncheckedCreateWithoutSectorInput> | NgoSectorCreateWithoutSectorInput[] | NgoSectorUncheckedCreateWithoutSectorInput[]
    connectOrCreate?: NgoSectorCreateOrConnectWithoutSectorInput | NgoSectorCreateOrConnectWithoutSectorInput[]
    upsert?: NgoSectorUpsertWithWhereUniqueWithoutSectorInput | NgoSectorUpsertWithWhereUniqueWithoutSectorInput[]
    createMany?: NgoSectorCreateManySectorInputEnvelope
    set?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    disconnect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    delete?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    connect?: NgoSectorWhereUniqueInput | NgoSectorWhereUniqueInput[]
    update?: NgoSectorUpdateWithWhereUniqueWithoutSectorInput | NgoSectorUpdateWithWhereUniqueWithoutSectorInput[]
    updateMany?: NgoSectorUpdateManyWithWhereWithoutSectorInput | NgoSectorUpdateManyWithWhereWithoutSectorInput[]
    deleteMany?: NgoSectorScalarWhereInput | NgoSectorScalarWhereInput[]
  }

  export type NgoCreateNestedOneWithoutSectorsInput = {
    create?: XOR<NgoCreateWithoutSectorsInput, NgoUncheckedCreateWithoutSectorsInput>
    connectOrCreate?: NgoCreateOrConnectWithoutSectorsInput
    connect?: NgoWhereUniqueInput
  }

  export type SectorCreateNestedOneWithoutNgosInput = {
    create?: XOR<SectorCreateWithoutNgosInput, SectorUncheckedCreateWithoutNgosInput>
    connectOrCreate?: SectorCreateOrConnectWithoutNgosInput
    connect?: SectorWhereUniqueInput
  }

  export type NgoUpdateOneRequiredWithoutSectorsNestedInput = {
    create?: XOR<NgoCreateWithoutSectorsInput, NgoUncheckedCreateWithoutSectorsInput>
    connectOrCreate?: NgoCreateOrConnectWithoutSectorsInput
    upsert?: NgoUpsertWithoutSectorsInput
    connect?: NgoWhereUniqueInput
    update?: XOR<XOR<NgoUpdateToOneWithWhereWithoutSectorsInput, NgoUpdateWithoutSectorsInput>, NgoUncheckedUpdateWithoutSectorsInput>
  }

  export type SectorUpdateOneRequiredWithoutNgosNestedInput = {
    create?: XOR<SectorCreateWithoutNgosInput, SectorUncheckedCreateWithoutNgosInput>
    connectOrCreate?: SectorCreateOrConnectWithoutNgosInput
    upsert?: SectorUpsertWithoutNgosInput
    connect?: SectorWhereUniqueInput
    update?: XOR<XOR<SectorUpdateToOneWithWhereWithoutNgosInput, SectorUpdateWithoutNgosInput>, SectorUncheckedUpdateWithoutNgosInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
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

  export type NgoSectorCreateWithoutNgoInput = {
    sector: SectorCreateNestedOneWithoutNgosInput
  }

  export type NgoSectorUncheckedCreateWithoutNgoInput = {
    sectorId: bigint | number
  }

  export type NgoSectorCreateOrConnectWithoutNgoInput = {
    where: NgoSectorWhereUniqueInput
    create: XOR<NgoSectorCreateWithoutNgoInput, NgoSectorUncheckedCreateWithoutNgoInput>
  }

  export type NgoSectorCreateManyNgoInputEnvelope = {
    data: NgoSectorCreateManyNgoInput | NgoSectorCreateManyNgoInput[]
    skipDuplicates?: boolean
  }

  export type NgoSectorUpsertWithWhereUniqueWithoutNgoInput = {
    where: NgoSectorWhereUniqueInput
    update: XOR<NgoSectorUpdateWithoutNgoInput, NgoSectorUncheckedUpdateWithoutNgoInput>
    create: XOR<NgoSectorCreateWithoutNgoInput, NgoSectorUncheckedCreateWithoutNgoInput>
  }

  export type NgoSectorUpdateWithWhereUniqueWithoutNgoInput = {
    where: NgoSectorWhereUniqueInput
    data: XOR<NgoSectorUpdateWithoutNgoInput, NgoSectorUncheckedUpdateWithoutNgoInput>
  }

  export type NgoSectorUpdateManyWithWhereWithoutNgoInput = {
    where: NgoSectorScalarWhereInput
    data: XOR<NgoSectorUpdateManyMutationInput, NgoSectorUncheckedUpdateManyWithoutNgoInput>
  }

  export type NgoSectorScalarWhereInput = {
    AND?: NgoSectorScalarWhereInput | NgoSectorScalarWhereInput[]
    OR?: NgoSectorScalarWhereInput[]
    NOT?: NgoSectorScalarWhereInput | NgoSectorScalarWhereInput[]
    ngoId?: UuidFilter<"NgoSector"> | string
    sectorId?: BigIntFilter<"NgoSector"> | bigint | number
  }

  export type NgoSectorCreateWithoutSectorInput = {
    ngo: NgoCreateNestedOneWithoutSectorsInput
  }

  export type NgoSectorUncheckedCreateWithoutSectorInput = {
    ngoId: string
  }

  export type NgoSectorCreateOrConnectWithoutSectorInput = {
    where: NgoSectorWhereUniqueInput
    create: XOR<NgoSectorCreateWithoutSectorInput, NgoSectorUncheckedCreateWithoutSectorInput>
  }

  export type NgoSectorCreateManySectorInputEnvelope = {
    data: NgoSectorCreateManySectorInput | NgoSectorCreateManySectorInput[]
    skipDuplicates?: boolean
  }

  export type NgoSectorUpsertWithWhereUniqueWithoutSectorInput = {
    where: NgoSectorWhereUniqueInput
    update: XOR<NgoSectorUpdateWithoutSectorInput, NgoSectorUncheckedUpdateWithoutSectorInput>
    create: XOR<NgoSectorCreateWithoutSectorInput, NgoSectorUncheckedCreateWithoutSectorInput>
  }

  export type NgoSectorUpdateWithWhereUniqueWithoutSectorInput = {
    where: NgoSectorWhereUniqueInput
    data: XOR<NgoSectorUpdateWithoutSectorInput, NgoSectorUncheckedUpdateWithoutSectorInput>
  }

  export type NgoSectorUpdateManyWithWhereWithoutSectorInput = {
    where: NgoSectorScalarWhereInput
    data: XOR<NgoSectorUpdateManyMutationInput, NgoSectorUncheckedUpdateManyWithoutSectorInput>
  }

  export type NgoCreateWithoutSectorsInput = {
    id?: string
    darpanId?: string | null
    name: string
    normalizedName?: string | null
    serialNumber?: string | null
    registrationNumber?: string | null
    registrationType?: string | null
    registrationRaw?: string | null
    email?: string | null
    phone?: string | null
    mobile?: string | null
    website?: string | null
    summaryAddress?: string | null
    address?: string | null
    district?: string | null
    state?: string | null
    pincode?: string | null
    darpanRegistrationDate?: Date | string | null
    registeredWith?: string | null
    typeOfNPO?: string | null
    actName?: string | null
    cityOfRegistration?: string | null
    stateOfRegistration?: string | null
    dateOfRegistration?: Date | string | null
    registrationDate?: Date | string | null
    summarySectors?: NgoCreatesummarySectorsInput | string[]
    primarySectors?: NgoCreateprimarySectorsInput | string[]
    secondarySectors?: NgoCreatesecondarySectorsInput | string[]
    operationalStates?: string | null
    operationalDistrict?: string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: string
    geocodedPincode?: string | null
    exactGeocodeMatch?: boolean | null
    accuracyLevel?: string | null
    sourceUrl?: string | null
    scrapedAt?: Date | string | null
    hash?: string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NgoUncheckedCreateWithoutSectorsInput = {
    id?: string
    darpanId?: string | null
    name: string
    normalizedName?: string | null
    serialNumber?: string | null
    registrationNumber?: string | null
    registrationType?: string | null
    registrationRaw?: string | null
    email?: string | null
    phone?: string | null
    mobile?: string | null
    website?: string | null
    summaryAddress?: string | null
    address?: string | null
    district?: string | null
    state?: string | null
    pincode?: string | null
    darpanRegistrationDate?: Date | string | null
    registeredWith?: string | null
    typeOfNPO?: string | null
    actName?: string | null
    cityOfRegistration?: string | null
    stateOfRegistration?: string | null
    dateOfRegistration?: Date | string | null
    registrationDate?: Date | string | null
    summarySectors?: NgoCreatesummarySectorsInput | string[]
    primarySectors?: NgoCreateprimarySectorsInput | string[]
    secondarySectors?: NgoCreatesecondarySectorsInput | string[]
    operationalStates?: string | null
    operationalDistrict?: string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: string
    geocodedPincode?: string | null
    exactGeocodeMatch?: boolean | null
    accuracyLevel?: string | null
    sourceUrl?: string | null
    scrapedAt?: Date | string | null
    hash?: string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NgoCreateOrConnectWithoutSectorsInput = {
    where: NgoWhereUniqueInput
    create: XOR<NgoCreateWithoutSectorsInput, NgoUncheckedCreateWithoutSectorsInput>
  }

  export type SectorCreateWithoutNgosInput = {
    id?: bigint | number
    name: string
  }

  export type SectorUncheckedCreateWithoutNgosInput = {
    id?: bigint | number
    name: string
  }

  export type SectorCreateOrConnectWithoutNgosInput = {
    where: SectorWhereUniqueInput
    create: XOR<SectorCreateWithoutNgosInput, SectorUncheckedCreateWithoutNgosInput>
  }

  export type NgoUpsertWithoutSectorsInput = {
    update: XOR<NgoUpdateWithoutSectorsInput, NgoUncheckedUpdateWithoutSectorsInput>
    create: XOR<NgoCreateWithoutSectorsInput, NgoUncheckedCreateWithoutSectorsInput>
    where?: NgoWhereInput
  }

  export type NgoUpdateToOneWithWhereWithoutSectorsInput = {
    where?: NgoWhereInput
    data: XOR<NgoUpdateWithoutSectorsInput, NgoUncheckedUpdateWithoutSectorsInput>
  }

  export type NgoUpdateWithoutSectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    darpanId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationType?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRaw?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    darpanRegistrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registeredWith?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfNPO?: NullableStringFieldUpdateOperationsInput | string | null
    actName?: NullableStringFieldUpdateOperationsInput | string | null
    cityOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    stateOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfRegistration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    summarySectors?: NgoUpdatesummarySectorsInput | string[]
    primarySectors?: NgoUpdateprimarySectorsInput | string[]
    secondarySectors?: NgoUpdatesecondarySectorsInput | string[]
    operationalStates?: NullableStringFieldUpdateOperationsInput | string | null
    operationalDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFieldUpdateOperationsInput | string
    geocodedPincode?: NullableStringFieldUpdateOperationsInput | string | null
    exactGeocodeMatch?: NullableBoolFieldUpdateOperationsInput | boolean | null
    accuracyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    scrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NgoUncheckedUpdateWithoutSectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    darpanId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: NullableStringFieldUpdateOperationsInput | string | null
    serialNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationNumber?: NullableStringFieldUpdateOperationsInput | string | null
    registrationType?: NullableStringFieldUpdateOperationsInput | string | null
    registrationRaw?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    summaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    pincode?: NullableStringFieldUpdateOperationsInput | string | null
    darpanRegistrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registeredWith?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfNPO?: NullableStringFieldUpdateOperationsInput | string | null
    actName?: NullableStringFieldUpdateOperationsInput | string | null
    cityOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    stateOfRegistration?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfRegistration?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    registrationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    summarySectors?: NgoUpdatesummarySectorsInput | string[]
    primarySectors?: NgoUpdateprimarySectorsInput | string[]
    secondarySectors?: NgoUpdatesecondarySectorsInput | string[]
    operationalStates?: NullableStringFieldUpdateOperationsInput | string | null
    operationalDistrict?: NullableStringFieldUpdateOperationsInput | string | null
    officeBearers?: NullableJsonNullValueInput | InputJsonValue
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    geocodingStatus?: StringFieldUpdateOperationsInput | string
    geocodedPincode?: NullableStringFieldUpdateOperationsInput | string | null
    exactGeocodeMatch?: NullableBoolFieldUpdateOperationsInput | boolean | null
    accuracyLevel?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    scrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hash?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: NullableJsonNullValueInput | InputJsonValue
    rawScrapedDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectorUpsertWithoutNgosInput = {
    update: XOR<SectorUpdateWithoutNgosInput, SectorUncheckedUpdateWithoutNgosInput>
    create: XOR<SectorCreateWithoutNgosInput, SectorUncheckedCreateWithoutNgosInput>
    where?: SectorWhereInput
  }

  export type SectorUpdateToOneWithWhereWithoutNgosInput = {
    where?: SectorWhereInput
    data: XOR<SectorUpdateWithoutNgosInput, SectorUncheckedUpdateWithoutNgosInput>
  }

  export type SectorUpdateWithoutNgosInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SectorUncheckedUpdateWithoutNgosInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type NgoSectorCreateManyNgoInput = {
    sectorId: bigint | number
  }

  export type NgoSectorUpdateWithoutNgoInput = {
    sector?: SectorUpdateOneRequiredWithoutNgosNestedInput
  }

  export type NgoSectorUncheckedUpdateWithoutNgoInput = {
    sectorId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type NgoSectorUncheckedUpdateManyWithoutNgoInput = {
    sectorId?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type NgoSectorCreateManySectorInput = {
    ngoId: string
  }

  export type NgoSectorUpdateWithoutSectorInput = {
    ngo?: NgoUpdateOneRequiredWithoutSectorsNestedInput
  }

  export type NgoSectorUncheckedUpdateWithoutSectorInput = {
    ngoId?: StringFieldUpdateOperationsInput | string
  }

  export type NgoSectorUncheckedUpdateManyWithoutSectorInput = {
    ngoId?: StringFieldUpdateOperationsInput | string
  }



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