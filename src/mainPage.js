const getMainPage  = (isLoggedIn) => {
    const page =
      `<!DOCTYPE html>
        <html>
        <head>
        <title>TheNodeProject</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
        <div id="root"></div>
        <script> window.userLoggedIn = ${isLoggedIn}</script>
        <script src="/public/bundle.js"></script>
        </body>
        </html>
        `
    return page;
};

export default getMainPage;

