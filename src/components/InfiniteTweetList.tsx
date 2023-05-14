import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type InfiniteTweetListProps = {
  isError: boolean;
  isLoading: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

const InfiniteTweetList = ({
  isError,
  isLoading,
  hasMore,
  fetchNewTweets,
  tweets,
}: InfiniteTweetListProps) => {
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;
  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No tweets</h2>
    );
  }
  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore ? hasMore : false}
        loader={"Loading..."}
      >
        {tweets.map((tweet) => {
          return <div key={tweet.id}>{tweet.content}</div>;
        })}
      </InfiniteScroll>
    </ul>
  );
};

export default InfiniteTweetList;
