// functional component that lists all the current comments related to the page
import React, {
  useEffect,
  useInsertionEffect,
  useState,
  className,
} from "react";
import CommentServices from "../services/CommentServices";
import ReplyBottonComponent from "./ReplyBottonComponent";
import { v4 } from 'uuid';

const ListCommentComponent = ({}) => {
  const [comments, setComments] = useState([]);
  const getAsynComments = async () => {
    try {
      CommentServices.getAllComments()
        .then((response) => {
          setComments(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("getting posts");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAsynComments();
    const interval = setInterval(() => {
      getAsynComments();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div>
        {comments.map((comment) => (
          <div
            className="card mb-3"
            key={v4()}
          >
            <div className="card-body">
              <div className="col-xl-11">
                <div className="row">
                  <p>
                    <strong> @{comment.userid}</strong>
                    <span className="mx-2 color-me">
                      {comment.date} @ {comment.ip}
                    </span>
                  </p>
                </div>
                <p> {comment.content}</p>
                <ReplyBottonComponent />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCommentComponent;
