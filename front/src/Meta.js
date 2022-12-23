import React from "react";
import {Helmet,HelmetProvider} from 'react-helmet-async';

const Meta=(props)=>{
    return(
        <HelmetProvider>
        <Helmet>
            <meta charSet="utf-8" />
            {/* SEO 태그 */}
            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keywords} />
            <meta name="author" content={props.author} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:url" content={props.url} />
            {/* <meta property='og:image' content={props.image} /> */}

            {/* 웹폰트 적용을 위한 외부 리소스 참조 */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap" rel="stylesheet"/>
        </Helmet>
    </HelmetProvider>
    )
}
export default Meta;