import './navbar.css'

function Navbar() {
    return (

        <nav class="navbar navbar-expand-lg border-right border-bottom">
            <div class="container col-12">

                <a class="navbar-brand" href="index.html">Masoud Photography</a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-lg-auto">
                        <li class="nav-item">
                            <a href="/" class="nav-link smoothScroll">Home</a>
                        </li>

                        <li class="nav-item">
                            <a href="#about" class="nav-link smoothScroll">About Us</a>
                        </li>

                        <li class="nav-item">
                            <a href="/profile" class="nav-link smoothScroll">Admin Panel</a>
                        </li>

                        <li class="nav-item">
                            <a href="#schedule" class="nav-link smoothScroll">Contact Us</a>
                        </li>
                    </ul>

                    <ul class="social-icon ml-lg-3">
                        <li><a href="#" class="fa fa-telegram"></a> </li>
                        <li><a href="#" class="fa fa-twitter"></a> </li>
                        <li><a href="#" class="fa fa-instagram"></a> </li>
                    </ul>
                </div>

            </div>
        </nav>


    )
}

export default Navbar;

