import React, { useEffect, useState } from 'react';
import './ViewBlog.css';
import Banner from '../Banner';
import { ethers } from 'ethers';
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from "@mui/material/CircularProgress";

/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const ViewBlog = () => {

    const location = useLocation();
    const [values, setValues] = useState([]);
    const [apiResp, setApiResp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNFTs = async () => {
            console.log('fetching nfts from be');
           await fetch("/api/accounts/" + location.state.address + "/blogs", {
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "X-Wallet-Address": location.state.address
                }
            }).then(response => response.json())
                .then(response => {
                    console.log("this is response", response);
                    setValues(response.data);
                    setApiResp(true);
                }).catch(err => {
                console.log(err);
            });
            console.log("this is values", values);
        }
        if (location.state!==null && location.state.address!==null){
            fetchNFTs();
        }
    }, []);

    const renderBlogs = () =>

        values.map( (blog, index) => (
            <Link to={"/blogs/" + blog.metadata.title } state={{'blog':blog, 'userAddress': location.state.address, 'profileAddress':( blog.address===null) ? location.state.address:blog.address}} className="card">
                <div className="inner">
                    <h2 className="title">{blog.metadata.title}</h2>
                    <h3 className="subtitle">{blog.metadata.subheading}</h3>
                    <time className="whiteCardTags">{blog.metadata.tags}
                    </time>
                </div>
            </Link>
        ) );

    const renderProgressBar = () => {
        if(location.state === null || location.state.address === null || location.state.address===''){
            alert("Get Metamask!");
            navigate('/');
        }else if (values === null || (values.length === 0 && !apiResp) ){
           return (
                   <Box className=" marginPadding">
                       <div className="holdOn"> Hold on tight while we fetch all your creations for you! </div>
                       <CircularProgress className="circular"/>
                   </Box>
           );
        }else{
            return null;
        }
    }



    const render = () => {
        return (
            <div className="back-container">
                <main >
                    <div>
                        <NavLink to={{
                            pathname: '/',
                        }}
                        >
                        <button className="cta-button connect-wallet-button left-align" >DeBlog</button>
                        </NavLink>

                    <section className="section">

                        <div className="container editArticleContainer">

                            <header>
                                <span className="siteTitle">My Blogs</span>
                            </header>

                            <div> {renderProgressBar()}</div>

                            {
                               ( values!==null && values.length!==0 ) ? (<div>{renderBlogs()}</div>): null
                            }

                            {
                                ((apiResp === true && values.length===0) || (location.state===null || location.state.address===null)) ? (
                                    <div className="noBlogMessage">
                                        Uh, oh, looks like you don't have any blogs minted yet 😕 <br/>
                                       <NavLink to="/">Try refreshing</NavLink> or mint a new blog 😀
                                    </div>
                                ): null
                            }

                        </div>
                    </section>
                    </div>
                </main>
            </div>

        );
    }

    return (
        <div className="ViewBlog">
            {render()}
        </div>
    )

}

export default ViewBlog;