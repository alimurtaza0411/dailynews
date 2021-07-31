import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import NewsLetter from '../utils/newsletter';
import Moment from 'react-moment';
import { getPostByID, clearPostByID } from '../../store/actions';
import { showToast } from '../utils/tool'; 
const PostComponent = (props) =>{
    const post = useSelector(state=>state.posts);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPostByID(props.match.params.id))
    },[dispatch,props.match.params.id]);
   
   useEffect(()=>{
        return ()=>{
            dispatch(clearPostByID())
        }
   },[dispatch])
   
   useEffect(()=>{
        if(post.postByID==='404'){
            showToast('ERROR', 'The page you request is not available');
            props.history.push('/');
        }
    },[post,props.history])

    return (
    <>
        { post.postByID ?
            <div className="article_container">
                <h1>{post.postByID.title}</h1>
                <div className="image" style={{background:`url(${post.postByID.imagexl})`}}>
                </div>
                <div className="author">
                <span>{post.postByID.author} -</span>
                <Moment format="DD MMMM">
                    {post.postByID.createdAt}
                </Moment>
                </div>
                <div className="mt-3 content">
                    <div dangerouslySetInnerHTML={{__html : post.postByID.content}}>
                    </div>
                </div>
            </div>
        : null}
        <NewsLetter/>
    </>
   );
}
export default PostComponent;