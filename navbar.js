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
                z-index: 1000;
            }
            nav ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                justify-content: center;
            }
            nav li {
                position: relative;
                padding: 10px 20px;
            }
            nav a {
                color: white;
                text-decoration: none;
                font-size: 18px;
                transition: 0.3s;
            }
            nav a:hover {
                color: #00c3ff;
            }
            .dropdown {
                position: absolute;
                top: 40px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 10px;
                border-radius: 5px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease-in-out;
            }
            li:hover .dropdown {
                opacity: 1;
                visibility: visible;
            }
        </style>
        <nav>
            <ul>
                <li>
                    <a href="/lynnie/">Home</a>
                </li>
                <li>
                    <a href="/lynnie/projects/aquarius/">One for my baby</a>
                    <div class="dropdown">All about him</div>
                </li>
                <li>
                    <a href="/lynnie/projects/another-project/">Another Project</a>
                    <div class="dropdown">Description of the second project</div>
                </li>
            </ul>
        </nav>
    `;
    document.body.insertBefore(navbar, document.body.firstChild);
});
