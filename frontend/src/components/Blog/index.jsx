import React, { useEffect, useState } from 'react';
import './Blog.css';
import Banner from '../Banner';
import { ethers } from 'ethers';
import {NavLink, useLocation, Route} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

/*
 * Don't worry about setCharacterNFT just yet, we will talk about it soon!
 */
const Blog = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const [values, setValues] = useState({
        title: '',
        content: '',
        tags: '',
        subheading: '',
        address: location.state.address,
    });

    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        event.persist();
        setValues((values) => ({
            ...values,
            [name]: event.target.value,
        }));
    }

    useEffect(() => {
        if(status === 'minted'){
            navigate('/');
        }
    },[status]);

    //
    const handleSubmit = (event) => {
        console.log('hi', values.title);
        event.preventDefault();
        setStatus('minting');
        // creates entity
        fetch("/api/blogs", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "X-Wallet-Address": location.state.address
            },
            "body": JSON.stringify({
                title: values.title,
                content: values.content,
                tags: values.tags,
                subheading: values.subheading,
            })
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                setStatus('minted');
            }).catch(err => {
            console.log(err);
        });

    }

    const saveDraft = () => {
        console.log('hi',location.state.address);
        alert('Your post is being saved as draft!');
        // creates entity
        fetch("/draft/blog", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "X-Wallet-Address": this.props.address
            },
            "body": JSON.stringify({
                title: this.state.title,
                content: this.state.content,
                tags: this.state.tags
            })
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                this.props.setCurrentScreen(3);
            }).catch(err => {
            console.log(err);
        });
    }

    const toolbar = () => {
        return (<div
                className="relative z-30 p-2 border rounded bg-bluish-gray dark:bg-brand-dark-grey-700 dark:border-brand-grey-800">
                <div className="flex flex-row flex-wrap justify-between pb-1">
                    <div
                        className="flex flex-row items-center text-sm text-gray-700 dark:text-gray-400">
                        <button
                            className="button-transparent small flex flex-row items-center active snip-button"
                            title="Write Markdown">
                            <svg className="w-4 h-4 mr-2 fill-current snip-svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z">
                                </path>
                            </svg>
                            <span className="font-medium">
          Write
        </span>
                        </button>
                        <button
                            className="button-transparent small flex flex-row items-center snip-button"
                            title="Preview Markdown">
                            <svg className="w-4 h-4 mr-2 fill-current snip-svg"
                                 viewBox="0 0 576 512">
                                <path
                                    d="M288 288a64 64 0 000-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 01-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0064 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 96a128 128 0 11-128 128A128.14 128.14 0 01288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 01129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 00320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 01544 256c-50.53 98.69-148.64 160-256 160z">
                                </path>
                            </svg>
                            <span>
          Preview
        </span>
                        </button>
                        <button
                            className="button-transparent small flex flex-row items-center snip-button"
                            title="Guide">
                            <svg className="w-4 h-4 mr-2 fill-current snip-svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm168.766 113.176l-62.885 62.885a128.711 128.711 0 00-33.941-33.941l62.885-62.885a217.323 217.323 0 0133.941 33.941zM256 352c-52.935 0-96-43.065-96-96s43.065-96 96-96 96 43.065 96 96-43.065 96-96 96zM363.952 68.853l-66.14 66.14c-26.99-9.325-56.618-9.33-83.624 0l-66.139-66.14c66.716-38.524 149.23-38.499 215.903 0zM121.176 87.234l62.885 62.885a128.711 128.711 0 00-33.941 33.941l-62.885-62.885a217.323 217.323 0 0133.941-33.941zm-52.323 60.814l66.139 66.14c-9.325 26.99-9.33 56.618 0 83.624l-66.139 66.14c-38.523-66.715-38.5-149.229 0-215.904zm18.381 242.776l62.885-62.885a128.711 128.711 0 0033.941 33.941l-62.885 62.885a217.366 217.366 0 01-33.941-33.941zm60.814 52.323l66.139-66.14c26.99 9.325 56.618 9.33 83.624 0l66.14 66.14c-66.716 38.524-149.23 38.499-215.903 0zm242.776-18.381l-62.885-62.885a128.711 128.711 0 0033.941-33.941l62.885 62.885a217.323 217.323 0 01-33.941 33.941zm52.323-60.814l-66.14-66.14c9.325-26.99 9.33-56.618 0-83.624l66.14-66.14c38.523 66.715 38.5 149.229 0 215.904z">
                                </path>
                            </svg>
                            <span>
          Guide
        </span>
                        </button>
                    </div>
                    <div
                        className="flex-row hidden md:flex md:w-full md:mt-2 lg:mt-0 lg:w-auto text-brand-grey-700 dark:text-brand-grey-500">
                        <div className="relative" id="toolbar-headings">
                            <button
                                className="h-full button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                                data-title="Heading">
                                <svg className="w-4 h-4 fill-current snip-svg"
                                     viewBox="0 0 512 512">
                                    <path
                                        d="M432 80v352h32a16 16 0 0116 16v16a16 16 0 01-16 16H336a16 16 0 01-16-16v-16a16 16 0 0116-16h32V280H144v152h32a16 16 0 0116 16v16a16 16 0 01-16 16H48a16 16 0 01-16-16v-16a16 16 0 0116-16h32V80H48a16 16 0 01-16-16V48a16 16 0 0116-16h128a16 16 0 0116 16v16a16 16 0 01-16 16h-32v152h224V80h-32a16 16 0 01-16-16V48a16 16 0 0116-16h128a16 16 0 0116 16v16a16 16 0 01-16 16z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Bold text (Ctrl / Cmd + b)" data-command="BOLD">
                            <svg data-command="BOLD"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 384 512">
                                <path
                                    d="M314.52 238.78A119.76 119.76 0 00232 32H48a16 16 0 00-16 16v16a16 16 0 0016 16h16v352H48a16 16 0 00-16 16v16a16 16 0 0016 16h208a128 128 0 00128-128c0-49.49-28.38-91.92-69.48-113.22zM128 80h88a72 72 0 010 144h-88zm112 352H128V272h112a80 80 0 010 160z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Italic text (Ctrl / Cmd + i)"
                            data-command="ITALIC">
                            <svg data-command="ITALIC"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 320 512">
                                <path
                                    d="M320 48v16a16 16 0 01-16 16h-67l-88 352h59a16 16 0 0116 16v16a16 16 0 01-16 16H16a16 16 0 01-16-16v-16a16 16 0 0116-16h67l88-352h-59a16 16 0 01-16-16V48a16 16 0 0116-16h192a16 16 0 0116 16z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Block quote" data-command="QUOTE">
                            <svg data-command="QUOTE"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 576 512">
                                <path
                                    d="M504 224h-56v-8c0-22.1 17.9-40 40-40h8c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-8c-101.5 0-184 82.5-184 184v192c0 39.7 32.3 72 72 72h128c39.7 0 72-32.3 72-72V296c0-39.7-32.3-72-72-72zm24 184c0 13.2-10.8 24-24 24H376c-13.2 0-24-10.8-24-24V216c0-75 61-136 136-136h8v48h-8c-48.5 0-88 39.5-88 88v56h104c13.2 0 24 10.8 24 24v112zM200 224h-56v-8c0-22.1 17.9-40 40-40h8c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48h-8C82.5 32 0 114.5 0 216v192c0 39.7 32.3 72 72 72h128c39.7 0 72-32.3 72-72V296c0-39.7-32.3-72-72-72zm24 184c0 13.2-10.8 24-24 24H72c-13.2 0-24-10.8-24-24V216c0-75 61-136 136-136h8v48h-8c-48.5 0-88 39.5-88 88v56h104c13.2 0 24 10.8 24 24v112z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Code snippet" data-command="CODE">
                            <svg data-command="CODE"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 576 512">
                                <path
                                    d="M234.8 511.7L196 500.4c-4.2-1.2-6.7-5.7-5.5-9.9L331.3 5.8c1.2-4.2 5.7-6.7 9.9-5.5L380 11.6c4.2 1.2 6.7 5.7 5.5 9.9L244.7 506.2c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1l27.2-29c3.1-3.3 2.8-8.5-.5-11.5L72.2 256l106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4L2.5 250.2c-3.4 3.2-3.4 8.5 0 11.7L140.3 391c3.2 3 8.2 2.8 11.3-.4zm284.1.4l137.7-129.1c3.4-3.2 3.4-8.5 0-11.7L435.7 121c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5L503.8 256l-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Link (Ctrl / Cmd + k)" data-command="LINK">
                            <svg data-command="LINK"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M314.222 197.78c51.091 51.091 54.377 132.287 9.75 187.16-6.242 7.73-2.784 3.865-84.94 86.02-54.696 54.696-143.266 54.745-197.99 0-54.711-54.69-54.734-143.255 0-197.99 32.773-32.773 51.835-51.899 63.409-63.457 7.463-7.452 20.331-2.354 20.486 8.192a173.31 173.31 0 004.746 37.828c.966 4.029-.272 8.269-3.202 11.198L80.632 312.57c-32.755 32.775-32.887 85.892 0 118.8 32.775 32.755 85.892 32.887 118.8 0l75.19-75.2c32.718-32.725 32.777-86.013 0-118.79a83.722 83.722 0 00-22.814-16.229c-4.623-2.233-7.182-7.25-6.561-12.346 1.356-11.122 6.296-21.885 14.815-30.405l4.375-4.375c3.625-3.626 9.177-4.594 13.76-2.294 12.999 6.524 25.187 15.211 36.025 26.049zM470.958 41.04c-54.724-54.745-143.294-54.696-197.99 0-82.156 82.156-78.698 78.29-84.94 86.02-44.627 54.873-41.341 136.069 9.75 187.16 10.838 10.838 23.026 19.525 36.025 26.049 4.582 2.3 10.134 1.331 13.76-2.294l4.375-4.375c8.52-8.519 13.459-19.283 14.815-30.405.621-5.096-1.938-10.113-6.561-12.346a83.706 83.706 0 01-22.814-16.229c-32.777-32.777-32.718-86.065 0-118.79l75.19-75.2c32.908-32.887 86.025-32.755 118.8 0 32.887 32.908 32.755 86.025 0 118.8l-45.848 45.84c-2.93 2.929-4.168 7.169-3.202 11.198a173.31 173.31 0 014.746 37.828c.155 10.546 13.023 15.644 20.486 8.192 11.574-11.558 30.636-30.684 63.409-63.457 54.733-54.735 54.71-143.3-.001-197.991z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Embed links" data-command="EMBED">
                            <svg data-command="EMBED"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 576 512">
                                <path
                                    d="M208 32h-88a56 56 0 00-56 56v77.49a40 40 0 01-11.72 28.29L7 239a24 24 0 000 34l45.24 45.24A40 40 0 0164 346.52V424a56 56 0 0056 56h88a16 16 0 0016-16v-16a16 16 0 00-16-16h-88a8 8 0 01-8-8v-77.48a88.06 88.06 0 00-25.78-62.24L57.93 256l28.29-28.28A88.06 88.06 0 00112 165.48V88a8 8 0 018-8h88a16 16 0 0016-16V48a16 16 0 00-16-16zm361 207l-45.25-45.24A40.07 40.07 0 01512 165.48V88a56 56 0 00-56-56h-88a16 16 0 00-16 16v16a16 16 0 0016 16h88a8 8 0 018 8v77.48a88 88 0 0025.78 62.24L518.06 256l-28.28 28.28A88 88 0 00464 346.52V424a8 8 0 01-8 8h-88a16 16 0 00-16 16v16a16 16 0 0016 16h88a56 56 0 0056-56v-77.49a40 40 0 0111.72-28.29L569 273a24 24 0 000-34z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Unordered List" data-command="BULLET">
                            <svg data-command="BULLET"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M48 368a48 48 0 1048 48 48 48 0 00-48-48zm0-160a48 48 0 1048 48 48 48 0 00-48-48zm0-160a48 48 0 1048 48 48 48 0 00-48-48zm448 24H176a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16V88a16 16 0 00-16-16zm0 160H176a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm0 160H176a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16z">
                                </path>
                            </svg>
                        </button>
                        <button
                            className="button-transparent small tooltip-handle tooltip-left-aligned snip-button"
                            data-title="Ordered List" title="Add a numbered list"
                            data-command="NUMBER">
                            <svg data-command="NUMBER"
                                 className="w-4 h-4 fill-current snip-svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M61.77 401l17.5-20.15a19.92 19.92 0 005.07-14.19v-3.31C84.34 356 80.5 352 73 352H16a8 8 0 00-8 8v16a8 8 0 008 8h22.84a154.82 154.82 0 00-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.3 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 01-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.73 6.13-3.2 11.72 2.62 15.94 7.71 4.69 20.39 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zM496 392H176a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm0-320H176a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16V88a16 16 0 00-16-16zm0 160H176a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zM16 160h64a8 8 0 008-8v-16a8 8 0 00-8-8H64V40a8 8 0 00-8-8H32a8 8 0 00-7.14 4.42l-8 16A8 8 0 0024 64h8v64H16a8 8 0 00-8 8v16a8 8 0 008 8zm-3.9 160H80a8 8 0 008-8v-16a8 8 0 00-8-8H41.33c3.28-10.29 48.33-18.68 48.33-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.45 18.75-4.38 5.59-3 10.84 2.79 15.37l8.58 6.88c5.61 4.56 11 2.47 16.13-2.44a13.4 13.4 0 019.45-3.84c3.33 0 9.28 1.56 9.28 8.75C51 248.19 0 257.31 0 304.59v4C0 316 5.08 320 12.1 320z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const renderContent = () => {
            return (
                <div className="back-container">

                    <main >
                        <div>
                            <NavLink to={{
                                pathname: '/',
                                state: ['from home page'],
                            }}
                            >
                                <button className="cta-button connect-wallet-button left-align">DeBlog
                                </button>
                            </NavLink>
                        </div>
                        <section className="section ">
                            <div className="container editArticleContainer">
                                <div className={"flex-row " + status}>
                                    <div>
                                        <form method="POST"
                                              onSubmit={handleSubmit}
                                        >
                                            <div>
                                                <div>
                                                    <button className="cta-button connect-wallet-button right-align"
                                                            type="submit">Mint Article
                                                    </button>
                                                </div>

                                                <div>
                                                    <button type="button" onClick={saveDraft}
                                                            className="cta-button connect-wallet-button right-align">Save
                                                        Draft
                                                    </button>
                                                </div>

                                                <div>
                                                <textarea maxLength="150" placeholder="Title…" rows={2} name="title"
                                                          value={values.title}
                                                          onChange={handleChange}
                                                          className="w-full px-4 mt-2 mb-5 text-3xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none text-brand-black dark:text-white placeholder-brand-grey-500"
                                                > </textarea>

                                                </div>

                                                <textarea maxLength="150" placeholder="Enter subtitle (Optional)"
                                                          rows={2}
                                                          name="subheading"
                                                          value={values.subheading}
                                                          onChange={handleChange}
                                                          className="w-full px-4 pr-10 text-2xl font-medium leading-snug bg-transparent outline-none appearance-none resize-none text-brand-grey-500 dark:text-white placeholder-brand-grey-500"
                                                > </textarea>

                                                {toolbar()}

                                                <textarea maxLength="150" placeholder="Enter relevant tags..." rows={2}
                                                          name="tags"
                                                          value={values.tags} onChange={handleChange}
                                                          className="w-full px-4 pr-10 text-1xl font-bold leading-snug bg-transparent outline-none appearance-none resize-none text-brand-grey-500 dark:text-white placeholder-brand-grey-500"
                                                > </textarea>

                                            </div>
                                            <div>
                                                {/*<textarea rows={10} placeholder="Content" name="content" value={this.state.content} onChange={this.handleChange}/>*/}
                                                <textarea name="content" placeholder="Tell your story…"
                                                          className="w-full resize-none p-4 bg-transparent text-brand-black dark:text-white focus:outline-none text-xl leading-snug placeholder-brand-grey-500 py-12 min-h-screen snipcss-3jcOB"
                                                     value={values.content} onChange={handleChange}
                                                          rows={5}>
</textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {status === 'minting' ? (
                                    <Box className="progress marginPadding">
                                        <div> Please wait, your blog is being minted!</div>
                                        <CircularProgress className="circular"/>
                                        <div> Note: Minted blogs take some time to reflect on OpenSea </div>
                                    </Box>):null
                                }

                            </div>

                        </section>
                    </main>

                </div>
            );
    }

    return (
    <div className="Blog">
        {renderContent()}
    </div>
    )
}

export default Blog;