document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.createElement("nav");
    navbar.innerHTML = `
        <style>
            nav {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 0;
                text-align: center;
                font-family: Arial, sans-serif;
            }
            nav a {
                color: white;
                text-decoration: none;
                margin: 0 15px;
                font-size: 18px;
                transition: 0.3s;
            }
            nav a:hover {
                color: #00c3ff;
            }
            body {
                padding-top: 50px; /* Prevent content from being hidden under navbar */
            }
        </style>
        <nav>
            <a href="/lynnie/">Home</a>
            <a href="/lynnie/projects/aquarius/">Aquarius</a>
            <a href="/lynnie/projects/another-project/">Another Project</a>
        </nav>
    `;
    document.body.insertBefore(navbar, document.body.firstChild);
});
