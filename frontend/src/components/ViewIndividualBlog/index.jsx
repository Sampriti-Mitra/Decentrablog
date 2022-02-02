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
        const [time, setTime] =  useState('');
        const [id, setId] =  useState('');
        const [content, setContent] = useState('');
        const [userAddress, setUserAddress] = useState('');
        const [profileAddress, setProfileAddress] = useState('');
        const contractAddress = '0x1fae6264085b974de560c61edf92ec7337146e9e';

        useEffect(() => {
            if (location.state !== null && location.state.blog!==null){
                console.log("this is location", location.state);
                setTitle(location.state.blog.metadata.title);
                setSubheading(location.state.blog.metadata.subheading);
                setContent(location.state.blog.metadata.content);
                setTags(location.state.blog.metadata.tags);
                setTime(location.state.blog.created_at);

                setId(location.state.blog.id);

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

    const buyNFTBlog = async () => {
        console.log("trying to buy NFT blog from author");
        try{
            startPayment({ether: "0.002", profileAddress: profileAddress});
            await fetch("/api/transfer/blogs/" + id +"/accept/" + profileAddress, {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "X-Wallet-Address": userAddress
                }
            }).then(response => response.json())
                .then(response => {
                    console.log("this is response", response);
                    // setValues(response.data);
                   // setApiResp(true);
                }).catch(err => {
                    console.log(err);
                });

        } catch (e) {
            console.log(e);
        }
    }

        const renderContent = () => {
            return (
                <div className="container editArticleContainer">

                    <header>
                        <span className="siteTitle">{title}</span>
                    </header>

                    <div className="p3 subtitle css-1hesiyt">{subheading}</div>

                    <h4 className="tags">{tags}</h4>

                    <div className="dateTime">{time}</div>

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

                        {(profileAddress!==null && profileAddress!==""  && profileAddress!==undefined && profileAddress!==userAddress)?
                            (
                                <button className="sponsorButton" onClick={sponsorAuthor}>Sponsor Author 💕️</button>
                            ):null
                        }

                        {(profileAddress!==null && profileAddress!=="" && profileAddress!==undefined && profileAddress!==userAddress)?
                            (
                                <button className="sponsorButton" onClick={buyNFTBlog}> Own this blog 💎 </button>

                            ):null
                        }

                        <button className="sponsorButton openSeaViewButton" onClick={() => window.open( 'https://testnets.opensea.io/assets/mumbai/'+contractAddress+"/" +id)}> View on Opensea 🌊 </button>

                    </section>

                </main>
            </div>
        );
}



export default ViewIndividualBlog;