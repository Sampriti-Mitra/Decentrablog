import React, { useEffect, useState } from 'react';
import './ViewBlog.css';
import Banner from '../Banner';
import { ethers } from 'ethers';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import Footer from "../Footer";
import { useParams } from "react-router";


const ViewIndividualBlog = () => {

        let { postSlug } = useParams();
        const location =  useLocation();
        const [title,setTitle] = useState('');
        const [subheading, setSubheading] = useState('');
        const [tags, setTags] =  useState('');
        const [content, setContent] = useState('');
        const [userAddress, setUserAddress] = useState('');
        const [profileAddress, setProfileAddress] = useState('');

        useEffect(() => {
            if (location.state !== null && location.state.blog!==null){
                console.log("this is location", location.state);
                setTitle(location.state.blog.title);
                setSubheading(location.state.blog.subheading);
                setContent(location.state.blog.content);
                setTags(location.state.blog.tags);
                setUserAddress(location.state.userAddress);
                setProfileAddress(location.state.profileAddress);

                console.log(title, subheading, tags, content);
                console.log("this is slugger", postSlug);
            }else if(location.state!==null){
                setUserAddress(location.state.userAddress);
                setProfileAddress(location.state.profileAddress);
            }
        }, [postSlug]);

        const startPayment = async({ether, profileAddress}) => {
            try{
                if(!window.ethereum){
                    throw new Error("no crypto wallet was found, please install it")
                }

                console.log("starting payment .......", ether, profileAddress, "orig", location.state.profileAddress);

                await window.ethereum.send('eth_requestAccounts');
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                console.log(signer);
                ethers.utils.getAddress(profileAddress);
                const tx = await  signer.sendTransaction({
                    to: profileAddress,
                    value: ethers.utils.parseEther(ether)
                });
                console.log(ether, profileAddress, "transaction hash", tx);
            } catch (err){
                console.log(err.message)
            }
        }

        const sponsorAuthor = async () => {
            console.log("trying to sponsor author")
            startPayment({ether: "0.002", profileAddress: profileAddress});
        }

        const renderContent = () => {
            return (
                <div className="container editArticleContainer">

                    <header>
                        <span className="siteTitle">{title}</span>
                    </header>

                    <h1 className="mt-5 p3 subtitle">{subheading}</h1>

                    <h4 className="mt-5 p3 tags">{tags}</h4>

                    <p className="p3 prose">
                        {content}
                    </p>
                </div>
            )
    }

// Render Methods

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
                    </div>

                    <section className="section ">

                        {renderContent()}

                    </section>

                    <button className="cta-button connect-wallet-button left-align" onClick={sponsorAuthor}> Sponsor Author {"<3"} </button>

                </main>
            </div>
        );
}



export default ViewIndividualBlog;