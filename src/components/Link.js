import React from "react";
import { gql, useMutation } from "@apollo/client";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants";
import { timeDifferenceForDate } from "../utils";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ link, index }) => {
  const { createdAt, description, postedBy, url, votes } = link;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createAt: "desc" };
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
  });
  return (
    <div>
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {votes.length} votes | by {postedBy ? postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;
