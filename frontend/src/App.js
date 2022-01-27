import React, { useEffect, useState } from "react";
import {NavLink, Link, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './styles/App.css';
import { ethers } from "ethers";
import ViewBlog from './components/ViewBlogs';

// Constants
const TWITTER_HANDLE = 'SampritiMitra';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0xF439E0F57645717561944DB617F75930Eb19F251";

const App = () => {

  // const redirect = () => {
  //   window.open('https://testnets.opensea.io/collection/boxnft-4uzxf0zznc', '_blank');
  //   evt => this.leave(evt);
  // }

  const [currentAccount, setCurrentAccount] = useState("");

  const [currentScreen, setCurrentScreen] = useState(1);

  const [values, setValues] = useState([]);

  const navigate = useNavigate();

  const checkIfWalletIsConnected = async() => {
    /*
    * First make sure we have access to window.ethereum
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found")
    }
  }

  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Polygon Mumbai test network
      const polygonMumbaiChainId = "0x13881"; 
      if (chainId !== polygonMumbaiChainId) {
        alert("You are not connected to the Polygon Mumbai Test Network!");
      }
       // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchNFTs = async () => {
      console.log("Hi, fetching all blogs");
      await fetch("/api/blogs", {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json",
          "X-Wallet-Address": currentAccount,
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

    console.log('this is current account', currentAccount);

    if (currentAccount !== ""){
      fetchNFTs();
    }

  }, [currentAccount]);

  const renderBlogs = () =>
      values.map( (blog, index) => (
          <div className="card-grid-space">
            <div className="num">{index}</div>
            <Link className="main-card" to={"/blogs/" + blog.title } state={{'blog':blog, 'userAddress': currentAccount, 'profileAddress': currentAccount}}
            >
              <div>
                <h1>{blog.title}</h1>
                <p>{blog.subheading}</p>
                <div className="date">26 Jan 2022</div>
                <div className="tags">
                  <div className="tag">{blog.tags}</div>
                </div>
              </div>
            </Link>
          </div>
      ));

  const viewAllBlogs = () => {
    return (
         <section className="cards-wrapper">
           {renderBlogs()}
         </section>
    )
  }

  const setBlogsState = () => {
    setCurrentScreen(2);
  }

  const renderContent = () => {
      return (
          <div className="fullContainer">
            <div className="sideDrawer">
              {/*<div className="profile">*/}
              {/*  <NavLink to={{*/}
              {/*    pathname: '/blogs'*/}
              {/*  }} state={{ address: currentAccount }}*/}
              {/*  >*/}
              {/*  <button className="cta-button mint-button marginTop ">*/}
              {/*    My NFTs*/}
              {/*  </button>*/}
              {/*  </NavLink>*/}

              {/*  <button onClick={null} className="cta-button mint-button marginTop ">*/}
              {/*    Auction*/}
              {/*  </button>*/}

              {/*  <button onClick={null} className="cta-button mint-button marginTop ">*/}
              {/*    Crowdfunding*/}
              {/*  </button>*/}

              {/*</div>*/}
              <div>{renderNavigationDrawer()}</div>
            </div>
            <div className="container">
              <div className="header-container">
                <p className="header gradient-text">Decentralised Blogging Platform</p>
                <p className="sub-text">
                  Write a blog. Mint it. Crowdfund it.
                </p>
                {currentAccount === "" ? (
                    renderNotConnectedContainer()
                ) : (
                    <div>

                      <NavLink to={{
                        pathname: '/new-story'
                      }} state={{ address: currentAccount }}
                      >
                      <button className="cta-button mint-button" >
                        Mint Your Blog
                      </button>
                    </NavLink>

                      <button onClick={setBlogsState} className="cta-button opensea-button">
                        View Our Minted Blogs
                      </button>


                      {
                        currentScreen===2? viewAllBlogs():null
                      }

                    </div>
                )}
              </div>

            </div>
          </div>
      );
  }

  const redirectToHome = ({url, state}) => {
    navigate(url, {state: state});
  }

  const renderNavigationDrawer = () => {
    return (
     <div>

       <nav>
         <ul>

           <li onClick={ ()=> {{ navigate('/', {state: {blogs:values, address: currentAccount}}); }}}>
             <div>

             <div className="home-icon">
                 <div className="roof">
                   <div className="roof-edge"></div>
                 </div>
                 <div className="front">
                 </div>
             </div>
             </div>
           </li>

           <li onClick={ () => {{ navigate('/blogs', {state: {blogs:values, address: currentAccount}}); }}}>
             <div className="about-icon">

               <div className="head">
                 <div className="eyes"></div>
                 <div className="beard"></div>
               </div>
             </div>
           </li>

           <li onClick={() => {{ navigate('/blogs', {state: {blogs:values, address: currentAccount}}); }}}>
             <div className="work-icon">
               <div className="paper"></div>
               <div className="lines"></div>
               <div className="lines"></div>
               <div className="lines"></div>
             </div>
           </li>
           <li onClick={() => { navigate('/blogs', {state: {blogs:values, address: currentAccount}}); }}>
             <div className="mail-icon">
               <div className="mail-base">
                 <div className="mail-top"></div>
               </div>
             </div>
           </li>
         </ul>
       </nav>

     </div>
    )
  }


// Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
};

export default App;