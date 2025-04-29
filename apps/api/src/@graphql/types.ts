import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateMatch = {
  date: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  playerIds: Array<Scalars['String']['input']>;
  status?: MatchStatus;
  title: Scalars['String']['input'];
};

export type CreatePlayer = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  full_name: Scalars['String']['input'];
  level?: PlayerLevel;
  status?: PlayerStatus;
};

export type CreateRoundInput = {
  matchId: Scalars['String']['input'];
  number?: Scalars['Int']['input'];
  scores: Array<CreateScore>;
  status?: RoundStatus;
};

export type CreateScore = {
  playerId: Scalars['String']['input'];
  points: Scalars['Int']['input'];
};

export type CreateScoreInput = {
  matchId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
  points: Scalars['Int']['input'];
  roundId: Scalars['String']['input'];
};

export type DeleteManyOutput = {
  __typename?: 'DeleteManyOutput';
  count: Scalars['Int']['output'];
};

export type Match = {
  __typename?: 'Match';
  date: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  players: Array<Player>;
  rounds: Array<Round>;
  status: MatchStatus;
  title: Scalars['String']['output'];
};

export type MatchHistory = {
  __typename?: 'MatchHistory';
  month: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum MatchStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Upcoming = 'UPCOMING'
}

export type Mutation = {
  __typename?: 'Mutation';
  addScore: Score;
  createMatch: Match;
  createPlayer: Player;
  createRound: Round;
  deleteMatch: Match;
  deletePlayer: Player;
  removeRound: Round;
  removeScoreFromRound: DeleteManyOutput;
  updateMatch: Match;
  updatePlayer: Player;
  updateRound: Round;
  updateScore: Score;
};


export type MutationAddScoreArgs = {
  createScoreInput: CreateScoreInput;
};


export type MutationCreateMatchArgs = {
  match: CreateMatch;
};


export type MutationCreatePlayerArgs = {
  player: CreatePlayer;
};


export type MutationCreateRoundArgs = {
  createRoundInput: CreateRoundInput;
};


export type MutationDeleteMatchArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRoundArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveScoreFromRoundArgs = {
  matchId: Scalars['String']['input'];
  roundId: Scalars['String']['input'];
};


export type MutationUpdateMatchArgs = {
  id: Scalars['String']['input'];
  match: UpdateMatch;
};


export type MutationUpdatePlayerArgs = {
  id: Scalars['String']['input'];
  player: UpdatePlayer;
};


export type MutationUpdateRoundArgs = {
  id: Scalars['String']['input'];
  updateRoundInput: UpdateRoundInput;
};


export type MutationUpdateScoreArgs = {
  matchId: Scalars['String']['input'];
  playerId: Scalars['String']['input'];
  roundId: Scalars['String']['input'];
  updateScoreInput: UpdateScoreInput;
};

export type Player = {
  __typename?: 'Player';
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  full_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  level: PlayerLevel;
  matches?: Maybe<Array<Match>>;
  rounds?: Maybe<Array<Round>>;
  status: PlayerStatus;
};

export type PlayerHistory = {
  __typename?: 'PlayerHistory';
  month: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum PlayerLevel {
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

export enum PlayerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Query = {
  __typename?: 'Query';
  match: Match;
  matches: Array<Match>;
  matches_history: Array<MatchHistory>;
  player: Player;
  player_history: Array<PlayerHistory>;
  players: Array<Player>;
  round: Round;
  rounds: Array<Round>;
  scores: Array<Score>;
};


export type QueryMatchArgs = {
  id: Scalars['String']['input'];
};


export type QueryPlayerArgs = {
  id: Scalars['String']['input'];
};


export type QueryPlayersArgs = {
  status?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRoundArgs = {
  id: Scalars['String']['input'];
};


export type QueryRoundsArgs = {
  matchId: Scalars['String']['input'];
};

export type Round = {
  __typename?: 'Round';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  match: Match;
  number: Scalars['Int']['output'];
  score: Scalars['Int']['output'];
  scores: Array<Score>;
  status: RoundStatus;
};

export enum RoundStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export type Score = {
  __typename?: 'Score';
  match: Match;
  player: Player;
  points: Scalars['Int']['output'];
  round: Round;
};

export type UpdateMatch = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  playerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<MatchStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePlayer = {
  bio?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<PlayerLevel>;
  status?: InputMaybe<PlayerStatus>;
};

export type UpdateRoundInput = {
  number?: InputMaybe<Scalars['Int']['input']>;
  scores?: InputMaybe<Array<CreateScore>>;
  status?: InputMaybe<RoundStatus>;
};

export type UpdateScoreInput = {
  id: Scalars['String']['input'];
  matchId?: InputMaybe<Scalars['String']['input']>;
  playerId?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  roundId?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateMatch: CreateMatch;
  CreatePlayer: CreatePlayer;
  CreateRoundInput: CreateRoundInput;
  CreateScore: CreateScore;
  CreateScoreInput: CreateScoreInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteManyOutput: ResolverTypeWrapper<DeleteManyOutput>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Match: ResolverTypeWrapper<Match>;
  MatchHistory: ResolverTypeWrapper<MatchHistory>;
  MatchStatus: MatchStatus;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<Player>;
  PlayerHistory: ResolverTypeWrapper<PlayerHistory>;
  PlayerLevel: PlayerLevel;
  PlayerStatus: PlayerStatus;
  Query: ResolverTypeWrapper<{}>;
  Round: ResolverTypeWrapper<Round>;
  RoundStatus: RoundStatus;
  Score: ResolverTypeWrapper<Score>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateMatch: UpdateMatch;
  UpdatePlayer: UpdatePlayer;
  UpdateRoundInput: UpdateRoundInput;
  UpdateScoreInput: UpdateScoreInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateMatch: CreateMatch;
  CreatePlayer: CreatePlayer;
  CreateRoundInput: CreateRoundInput;
  CreateScore: CreateScore;
  CreateScoreInput: CreateScoreInput;
  DateTime: Scalars['DateTime']['output'];
  DeleteManyOutput: DeleteManyOutput;
  Int: Scalars['Int']['output'];
  Match: Match;
  MatchHistory: MatchHistory;
  Mutation: {};
  Player: Player;
  PlayerHistory: PlayerHistory;
  Query: {};
  Round: Round;
  Score: Score;
  String: Scalars['String']['output'];
  UpdateMatch: UpdateMatch;
  UpdatePlayer: UpdatePlayer;
  UpdateRoundInput: UpdateRoundInput;
  UpdateScoreInput: UpdateScoreInput;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteManyOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteManyOutput'] = ResolversParentTypes['DeleteManyOutput']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Match'] = ResolversParentTypes['Match']> = {
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MatchStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MatchHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MatchHistory'] = ResolversParentTypes['MatchHistory']> = {
  month?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationAddScoreArgs, 'createScoreInput'>>;
  createMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationCreateMatchArgs, 'match'>>;
  createPlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationCreatePlayerArgs, 'player'>>;
  createRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationCreateRoundArgs, 'createRoundInput'>>;
  deleteMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationDeleteMatchArgs, 'id'>>;
  deletePlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationDeletePlayerArgs, 'id'>>;
  removeRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationRemoveRoundArgs, 'id'>>;
  removeScoreFromRound?: Resolver<ResolversTypes['DeleteManyOutput'], ParentType, ContextType, RequireFields<MutationRemoveScoreFromRoundArgs, 'matchId' | 'roundId'>>;
  updateMatch?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<MutationUpdateMatchArgs, 'id' | 'match'>>;
  updatePlayer?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationUpdatePlayerArgs, 'id' | 'player'>>;
  updateRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<MutationUpdateRoundArgs, 'id' | 'updateRoundInput'>>;
  updateScore?: Resolver<ResolversTypes['Score'], ParentType, ContextType, RequireFields<MutationUpdateScoreArgs, 'matchId' | 'playerId' | 'roundId' | 'updateScoreInput'>>;
};

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  full_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['PlayerLevel'], ParentType, ContextType>;
  matches?: Resolver<Maybe<Array<ResolversTypes['Match']>>, ParentType, ContextType>;
  rounds?: Resolver<Maybe<Array<ResolversTypes['Round']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PlayerStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerHistory'] = ResolversParentTypes['PlayerHistory']> = {
  month?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  match?: Resolver<ResolversTypes['Match'], ParentType, ContextType, RequireFields<QueryMatchArgs, 'id'>>;
  matches?: Resolver<Array<ResolversTypes['Match']>, ParentType, ContextType>;
  matches_history?: Resolver<Array<ResolversTypes['MatchHistory']>, ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<QueryPlayerArgs, 'id'>>;
  player_history?: Resolver<Array<ResolversTypes['PlayerHistory']>, ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType, Partial<QueryPlayersArgs>>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<QueryRoundArgs, 'id'>>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryRoundsArgs, 'matchId'>>;
  scores?: Resolver<Array<ResolversTypes['Score']>, ParentType, ContextType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  match?: Resolver<ResolversTypes['Match'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scores?: Resolver<Array<ResolversTypes['Score']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['RoundStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Score'] = ResolversParentTypes['Score']> = {
  match?: Resolver<ResolversTypes['Match'], ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  DeleteManyOutput?: DeleteManyOutputResolvers<ContextType>;
  Match?: MatchResolvers<ContextType>;
  MatchHistory?: MatchHistoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerHistory?: PlayerHistoryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Round?: RoundResolvers<ContextType>;
  Score?: ScoreResolvers<ContextType>;
};

