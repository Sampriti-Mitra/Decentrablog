import React, { useEffect, useState } from 'react';
import './ViewBlog.css';
import Banner from '../Banner';
import { ethers } from 'ethers';
import {Link, NavLink, useLocation} from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const ViewBlog = () => {

    const location = useLocation();
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            console.log('fetching nfts from be');
           await fetch("/api/blogs", {
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
                }).catch(err => {
                console.log(err);
            });
            console.log("this is values", values);
        }
        fetchNFTs();
    }, []);

    const renderBlogs = () =>

        values.map( (blog, index) => (
            <Link to={"/blogs/" + blog.title } state={{'blog':blog, 'userAddress': location.state.address, 'profileAddress': location.state.address}} className="card">
                <div className="inner">
                    <h2 className="title">{blog.title}</h2>
                    <time className="subtitle">{blog.subheading}
                    </time>
                </div>
            </Link>
        ) );

    const renderProgressBar = () => {
        if (values.length === 0 ){
           return (<div className="box-text" >
               <div className="centerText">
                   <div className="text-class">Hold on tight while we fetch all your creations for you.</div>
                   <LinearProgress className="progress-text"> </LinearProgress>
           </div>
            </div>);
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

                                <div>{renderBlogs()}</div>

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