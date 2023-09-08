import { GraphQLResolveInfo } from 'graphql';
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
};

export type Album = {
  __typename?: 'Album';
  artistIds: Array<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genres: Array<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  labels: Array<Scalars['String']['output']>;
  length?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  producers: Array<Scalars['String']['output']>;
  releaseYear?: Maybe<Scalars['String']['output']>;
  tracks: Array<Track>;
};

export type AlbumInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  releaseYear?: InputMaybe<Scalars['String']['input']>;
};

export type Artist = {
  __typename?: 'Artist';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  origin?: Maybe<Scalars['String']['output']>;
};

export type ArtistInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistMutationResponse = MutationResponse & {
  __typename?: 'ArtistMutationResponse';
  artist?: Maybe<Artist>;
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum Condition {
  G = 'G',
  M = 'M',
  Nm = 'NM',
  P = 'P',
  Vg = 'VG',
  Vgp = 'VGP'
}

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GenreInput = {
  name: Scalars['String']['input'];
};

export type GenreMutationResponse = MutationResponse & {
  __typename?: 'GenreMutationResponse';
  code: Scalars['Int']['output'];
  genre?: Maybe<Genre>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addArtist?: Maybe<ArtistMutationResponse>;
  addGenre?: Maybe<GenreMutationResponse>;
  addOwnedAlbum?: Maybe<OwnedAlbumMutationResponse>;
  addWishlistAlbum?: Maybe<WishlistAlbumMutationResponse>;
  deleteArtist?: Maybe<ArtistMutationResponse>;
  deleteGenre?: Maybe<GenreMutationResponse>;
  deleteOwnedAlbum?: Maybe<OwnedAlbumMutationResponse>;
  deleteWishlistAlbum?: Maybe<WishlistAlbumMutationResponse>;
  updateArtist?: Maybe<ArtistMutationResponse>;
  updateGenre?: Maybe<GenreMutationResponse>;
  updateOwnedAlbum?: Maybe<OwnedAlbumMutationResponse>;
  updateWishlistAlbum?: Maybe<WishlistAlbumMutationResponse>;
};


export type MutationAddArtistArgs = {
  input: ArtistInput;
};


export type MutationAddGenreArgs = {
  input: GenreInput;
};


export type MutationAddOwnedAlbumArgs = {
  artistIds: Array<Scalars['ID']['input']>;
  condition?: InputMaybe<Condition>;
  genres: Array<Scalars['ID']['input']>;
  input: AlbumInput;
  labels: Array<Scalars['String']['input']>;
  producers: Array<Scalars['String']['input']>;
  tracks: Array<TrackInput>;
};


export type MutationAddWishlistAlbumArgs = {
  artistIds: Array<Scalars['ID']['input']>;
  genres: Array<Scalars['ID']['input']>;
  input: AlbumInput;
  labels: Array<Scalars['String']['input']>;
  listings: Array<Scalars['String']['input']>;
  producers: Array<Scalars['String']['input']>;
  ranking?: InputMaybe<Scalars['Int']['input']>;
  tracks: Array<TrackInput>;
};


export type MutationDeleteArtistArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGenreArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOwnedAlbumArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWishlistAlbumArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateArtistArgs = {
  id: Scalars['ID']['input'];
  input: ArtistInput;
};


export type MutationUpdateGenreArgs = {
  id: Scalars['ID']['input'];
  input: GenreInput;
};


export type MutationUpdateOwnedAlbumArgs = {
  artistIds: Array<Scalars['ID']['input']>;
  condition?: InputMaybe<Condition>;
  genres: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  input: AlbumInput;
  labels: Array<Scalars['String']['input']>;
  producers: Array<Scalars['String']['input']>;
  tracks: Array<TrackInput>;
};


export type MutationUpdateWishlistAlbumArgs = {
  artistIds: Array<Scalars['ID']['input']>;
  genres: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  input: AlbumInput;
  labels: Array<Scalars['String']['input']>;
  listings: Array<Scalars['String']['input']>;
  producers: Array<Scalars['String']['input']>;
  ranking?: InputMaybe<Scalars['Int']['input']>;
  tracks: Array<TrackInput>;
};

export type MutationResponse = {
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type OwnedAlbum = {
  __typename?: 'OwnedAlbum';
  album?: Maybe<Album>;
  condition?: Maybe<Condition>;
  id: Scalars['ID']['output'];
};

export type OwnedAlbumMutationResponse = MutationResponse & {
  __typename?: 'OwnedAlbumMutationResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  ownedAlbum?: Maybe<OwnedAlbum>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  artist: Array<Artist>;
  genres: Array<Genre>;
  ownedAlbums: Array<OwnedAlbum>;
  wishlistAlbums: Array<WishlistAlbum>;
};

export type Track = {
  __typename?: 'Track';
  length?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  side?: Maybe<Scalars['Int']['output']>;
};

export type TrackInput = {
  length?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  side?: InputMaybe<Scalars['Int']['input']>;
};

export type WishlistAlbum = {
  __typename?: 'WishlistAlbum';
  album?: Maybe<Album>;
  id: Scalars['ID']['output'];
  listings: Array<Scalars['String']['output']>;
  ranking?: Maybe<Scalars['Int']['output']>;
};

export type WishlistAlbumMutationResponse = MutationResponse & {
  __typename?: 'WishlistAlbumMutationResponse';
  code: Scalars['Int']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  wishlistAlbum?: Maybe<WishlistAlbum>;
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


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  MutationResponse: ( ArtistMutationResponse ) | ( GenreMutationResponse ) | ( OwnedAlbumMutationResponse ) | ( WishlistAlbumMutationResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Album: ResolverTypeWrapper<Album>;
  AlbumInput: AlbumInput;
  Artist: ResolverTypeWrapper<Artist>;
  ArtistInput: ArtistInput;
  ArtistMutationResponse: ResolverTypeWrapper<ArtistMutationResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Condition: Condition;
  Genre: ResolverTypeWrapper<Genre>;
  GenreInput: GenreInput;
  GenreMutationResponse: ResolverTypeWrapper<GenreMutationResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  OwnedAlbum: ResolverTypeWrapper<OwnedAlbum>;
  OwnedAlbumMutationResponse: ResolverTypeWrapper<OwnedAlbumMutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Track: ResolverTypeWrapper<Track>;
  TrackInput: TrackInput;
  WishlistAlbum: ResolverTypeWrapper<WishlistAlbum>;
  WishlistAlbumMutationResponse: ResolverTypeWrapper<WishlistAlbumMutationResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Album: Album;
  AlbumInput: AlbumInput;
  Artist: Artist;
  ArtistInput: ArtistInput;
  ArtistMutationResponse: ArtistMutationResponse;
  Boolean: Scalars['Boolean']['output'];
  Genre: Genre;
  GenreInput: GenreInput;
  GenreMutationResponse: GenreMutationResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  OwnedAlbum: OwnedAlbum;
  OwnedAlbumMutationResponse: OwnedAlbumMutationResponse;
  Query: {};
  String: Scalars['String']['output'];
  Track: Track;
  TrackInput: TrackInput;
  WishlistAlbum: WishlistAlbum;
  WishlistAlbumMutationResponse: WishlistAlbumMutationResponse;
};

export type AlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
  artistIds?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  producers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  releaseYear?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tracks?: Resolver<Array<ResolversTypes['Track']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtistMutationResponse'] = ResolversParentTypes['ArtistMutationResponse']> = {
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GenreMutationResponse'] = ResolversParentTypes['GenreMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addArtist?: Resolver<Maybe<ResolversTypes['ArtistMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddArtistArgs, 'input'>>;
  addGenre?: Resolver<Maybe<ResolversTypes['GenreMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddGenreArgs, 'input'>>;
  addOwnedAlbum?: Resolver<Maybe<ResolversTypes['OwnedAlbumMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddOwnedAlbumArgs, 'artistIds' | 'genres' | 'input' | 'labels' | 'producers' | 'tracks'>>;
  addWishlistAlbum?: Resolver<Maybe<ResolversTypes['WishlistAlbumMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddWishlistAlbumArgs, 'artistIds' | 'genres' | 'input' | 'labels' | 'listings' | 'producers' | 'tracks'>>;
  deleteArtist?: Resolver<Maybe<ResolversTypes['ArtistMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteArtistArgs, 'id'>>;
  deleteGenre?: Resolver<Maybe<ResolversTypes['GenreMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteGenreArgs, 'id'>>;
  deleteOwnedAlbum?: Resolver<Maybe<ResolversTypes['OwnedAlbumMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteOwnedAlbumArgs, 'id'>>;
  deleteWishlistAlbum?: Resolver<Maybe<ResolversTypes['WishlistAlbumMutationResponse']>, ParentType, ContextType, RequireFields<MutationDeleteWishlistAlbumArgs, 'id'>>;
  updateArtist?: Resolver<Maybe<ResolversTypes['ArtistMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateArtistArgs, 'id' | 'input'>>;
  updateGenre?: Resolver<Maybe<ResolversTypes['GenreMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateGenreArgs, 'id' | 'input'>>;
  updateOwnedAlbum?: Resolver<Maybe<ResolversTypes['OwnedAlbumMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateOwnedAlbumArgs, 'artistIds' | 'genres' | 'id' | 'input' | 'labels' | 'producers' | 'tracks'>>;
  updateWishlistAlbum?: Resolver<Maybe<ResolversTypes['WishlistAlbumMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateWishlistAlbumArgs, 'artistIds' | 'genres' | 'id' | 'input' | 'labels' | 'listings' | 'producers' | 'tracks'>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'ArtistMutationResponse' | 'GenreMutationResponse' | 'OwnedAlbumMutationResponse' | 'WishlistAlbumMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type OwnedAlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnedAlbum'] = ResolversParentTypes['OwnedAlbum']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['Condition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OwnedAlbumMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnedAlbumMutationResponse'] = ResolversParentTypes['OwnedAlbumMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownedAlbum?: Resolver<Maybe<ResolversTypes['OwnedAlbum']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  artist?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType>;
  ownedAlbums?: Resolver<Array<ResolversTypes['OwnedAlbum']>, ParentType, ContextType>;
  wishlistAlbums?: Resolver<Array<ResolversTypes['WishlistAlbum']>, ParentType, ContextType>;
};

export type TrackResolvers<ContextType = any, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = {
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  side?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WishlistAlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['WishlistAlbum'] = ResolversParentTypes['WishlistAlbum']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  listings?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  ranking?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WishlistAlbumMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WishlistAlbumMutationResponse'] = ResolversParentTypes['WishlistAlbumMutationResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  wishlistAlbum?: Resolver<Maybe<ResolversTypes['WishlistAlbum']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Album?: AlbumResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  ArtistMutationResponse?: ArtistMutationResponseResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  GenreMutationResponse?: GenreMutationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  OwnedAlbum?: OwnedAlbumResolvers<ContextType>;
  OwnedAlbumMutationResponse?: OwnedAlbumMutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Track?: TrackResolvers<ContextType>;
  WishlistAlbum?: WishlistAlbumResolvers<ContextType>;
  WishlistAlbumMutationResponse?: WishlistAlbumMutationResponseResolvers<ContextType>;
};

