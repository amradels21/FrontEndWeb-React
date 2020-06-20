import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent';


        function RenderDish({dish}) {
        if(dish!=null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
         );

         else
            return(
            <div></div>
            );
        }


        function RenderComments({comments, addComment, dishId}) {
            if(comments!=null){
              
                const commentDetails = comments.map((comment)=> {
                   
                const options = {
                  year: 'numeric',
                  month: 'short',
                   day: '2-digit'
                       }
                   
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US',options).format(new Date(comment.date))}
                        </p>
                     </li>
                    );
             });
            
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentDetails}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
           }

           else
           {
               return(
               <div></div>
               );
           }
           
        }



        const  DishDetail = (props) => {

            if (props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">            
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (props.errMess) {
                return(
                    <div className="container">
                        <div className="row">            
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else if (props.dish != null){
                return (
                  <div className="container">
                  <div className="row">
                      <Breadcrumb>
  
                          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>                
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-5 m-1">
                          <RenderDish dish={props.dish} />
                      </div>
                      <div className="col-12 col-md-5 m-1">
                           <RenderComments comments={props.comments}
                               addComment={props.addComment}
                               dishId={props.dish.id}/>                  
                      </div>
                  </div>
                  </div>
                  );
                }
                else{
                     return (
                         <div></div>
                         );
                      
                }
            
           
            
            
        }




        
    

export default DishDetail;