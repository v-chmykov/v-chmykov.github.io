masonry();

document.addEventListener('DOMContentLoaded', function () {
    offCanvas();
    carousels();
    highlightCurrentPage();
    elevator();
});

function highlightCurrentPage() {
    var links = document.querySelectorAll("a[href='" + location.href + "']");
    links.forEach(function (a) {
        a.parentElement.classList.add('active');
    });
}

/* =========================================
 *  carousels
 *  =======================================*/
function carousels() {
    document.querySelectorAll('.carousel-images').forEach(function (container) {
        var imgs = Array.from(container.querySelectorAll('img'));
        if (imgs.length === 0) return;

        var list = document.createElement('ul');
        list.className = 'splide__list';
        imgs.forEach(function (img) {
            var li = document.createElement('li');
            li.className = 'splide__slide';
            li.appendChild(img);
            list.appendChild(li);
        });

        var track = document.createElement('div');
        track.className = 'splide__track';
        track.appendChild(list);

        var splideEl = document.createElement('div');
        splideEl.className = 'splide';
        splideEl.appendChild(track);

        container.parentNode.replaceChild(splideEl, container);

        new Splide(splideEl, {
            type: 'loop',
            autoplay: false,
            arrows: true,
            pagination: true,
        }).mount();

        // Rearrange controls into a single row below the image: [←] [● ● ●] [→]
        var arrowsEl = splideEl.querySelector('.splide__arrows');
        var paginationEl = splideEl.querySelector('.splide__pagination');
        if (arrowsEl && paginationEl) {
            var controls = document.createElement('div');
            controls.className = 'splide__controls';
            splideEl.appendChild(controls);
            controls.appendChild(arrowsEl.querySelector('.splide__arrow--prev'));
            controls.appendChild(paginationEl);
            controls.appendChild(arrowsEl.querySelector('.splide__arrow--next'));
            arrowsEl.remove();
        }
    });
}

/* =========================================
 *  masonry
 *  =======================================*/
function masonry() {
    var gridEl = document.querySelector('.grid');
    if (!gridEl) return;
    var msnry = new Masonry(gridEl, {
        itemSelector: '.masonry-item'
    });
    imagesLoaded(gridEl).on('progress', function () {
        msnry.layout();
    });
}

/* =========================================
 *  Off-canvas menu
 *  =======================================*/
function offCanvas() {
    document.querySelectorAll('[data-toggle="offcanvas"]').forEach(function (el) {
        el.addEventListener('click', function () {
            document.querySelector('.row-offcanvas').classList.toggle('active');
        });
    });
}

/* =========================================
 *  Scroll-to-top elevator
 *  =======================================*/
function elevator() {
    var el = document.getElementById('js-scroll-to-top');
    if (!el) return;
    var limit = window.innerHeight / 2;

    el.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0);
    });

    window.addEventListener('scroll', function () {
        el.classList.toggle('elevator-hidden', window.pageYOffset < limit);
    });
}
