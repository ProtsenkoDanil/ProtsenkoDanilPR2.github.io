var app = new Vue({
    el: "article",
    data: {
        products: [
            { 
            id: 1, 
            title: "Sweet Pepper TAG 1000 (TAG 950)", 
            short_text: 'Bell Pepper', 
            image: 'img/Perec1.png',
            char: "<b>Resistance</b> <br>HR: Pepper mild mottle virus (PMMoV), Tobacco mosaic virus (TMV), Bacterial wilt <br> IR: Phytophthora capsici, Root-knot nematodes, Leaf spot",
            plant: "<li><span>Vigorous growth with lush foliage providing good cover.</span></li><li><span>Highly productive with continuous setting.</span></li><li><span>Early-maturing variety.</span></li>",
            pepper: "<li><span>Excellent shelf life with vibrant red, yellow, or green colors, depending on the cultivar.</span></li><li><span>Large-sized with thick, crisp flesh.</span></li><li><span>Typically weighing around 150 to 200 grams.</span></li>",
            cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
            color: "Red, Yellow, Green"
        },
            {
            id: 2, 
            title: "Sweet Pepper TAG 1000 (TAG 753)", 
            short_text: 'Bell Pepper', 
            image: 'img/Perec2.png', 
            char: "<b>Resistance</b> <br>HR: Pepper mild mottle virus (PMMoV), Tobacco mosaic virus (TMV), Bacterial wilt <br> IR: Phytophthora capsici, Root-knot nematodes, Leaf spot",
            plant: "<li><span>Vigorous growth with lush foliage and a compact habit.</span></li><li><span>Consistently high yields with uniform size.</span></li><li><span>Mid to late-season variety.</span></li>",
            pepper: "<li><span>Excellent storage ability with thick, juicy walls.</span></li><li><span>Vibrant colors ranging from red, yellow, to orange.</span></li><li><span>Medium-sized weighing around 100 to 150 grams.</span></li>",
            cycle: "<li><span>Spring</span></li><li><span>Summer</span></li>",
            color: "Red, Yellow, Orange"
        },
            {
            id: 3, 
            title: "Sweet Pepper TAG 1000 (TAG 878)", 
            short_text: 'Bell Pepper', 
            image: 'img/Perec3.png', 
            char: "<b>Resistance</b> <br>HR: Pepper mild mottle virus (PMMoV), Tobacco mosaic virus (TMV), Bacterial wilt <br> IR: Phytophthora capsici, Root-knot nematodes, Leaf spot",
            plant: "<li><span>Compact growth habit with dense foliage.</span></li><li><span>High yields of uniform.</span></li><li><span>Late-season variety.</span></li>",
            pepper: "<li><span>Excellent shelf life with crisp, sweet flesh.</span></li><li><span>Colorful ranging from red, orange, to yellow.</span></li><li><span>Medium to large-sized typically weighing 150 to 200 grams.</span></li>",
            cycle: "<li><span>Summer</span></li><li><span>Fall</span></li>",
            color: "Red, Orange, Yellow"
        },
            { 
            id: 4, 
            title: "Sweet Pepper TAG 1000 (TAG 933)", 
            short_text: 'Bell Pepper', 
            image: 'img/Perec4.png', 
            char: "<b>Resistance</b> <br>HR: Pepper mild mottle virus (PMMoV), Tobacco mosaic virus (TMV), Bacterial wilt <br> IR: Phytophthora capsici, Root-knot nematodes, Leaf spot",
            plant: "<li><span>Compact growth with excellent coverage.</span></li><li><span>High yields of uniform, medium-sized.</span></li><li><span>Mid-season variety.</span></li>",
            pepper: "<li><span>Long shelf life with thick walls and a sweet flavor.</span></li><li><span>Distinctive red, orange, or yellow colors, depending on the cultivar.</span></li><li><span>Medium-sized averaging 100 to 150 grams.</span></li>",
            cycle: "<li><span>Summer</span></li><li><span>Fall</span></li>",
            color: "Red, Orange, Yellow"
        },
            { 
            id: 5, 
            title: "Sweet Pepper TAG 1000 (TAG 912)", 
            short_text: 'Bell Pepper', 
            image: 'img/Perec5.png', 
            char: "<b>Resistance</b> <br>HR: Pepper mild mottle virus (PMMoV), Tobacco mosaic virus (TMV), Bacterial wilt <br> IR: Phytophthora capsici, Root-knot nematodes, Leaf spot",
            plant: "<li><span>Compact growth habit with abundant foliage.</span></li><li><span>Consistent yields of medium to large-sized .</span></li><li><span>Late-season variety.</span></li>",
            pepper: "<li><span>Excellent storage quality with a crisp texture.</span></li><li><span>Bright red, orange, or yellow hues, depending on the variety.</span></li><li><span>Medium to large-sized weighing around 150 to 200 grams.</span></li>",
            cycle: "<li><span>Summer</span></li><li><span>Fall</span></li>",
            color: "Red, Orange, Yellow"
        }
        ],
        product: {},
        btnVisible: 0,
        cart: {},
        contactFields: {
            name: '',
            companyName: '',
            position: '',
            city: '',
            country: '',
            telephone: '',
            email: '',
            userType: 'seed producer',
            otherType: '',
            interest: ''
        },
        orderInfo: {
            name: '',
            companyName: '',
            position: '',
            city: '',
            country: '',
            telephone: '',
            email: '',
            userType: 'seed producer',
            otherType: '',
            interest: ''
        },
        showOrderInfo: false,
        showTableHeaders: true
    },
    mounted: function() {
        this.getProduct();
        this.getCart();
        this.checkInCart();
    },
    methods: {
        addItem: function(id) {
            window.localStorage.setItem('prod', id);
        },
        getProduct: function() {
            console.log(this.product)
            if(window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if(this.products && this.products.length > 0) {
                    for(i in this.products) {
                        if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                    }
                }
            }
        },
        addToCart: function(id) {
            var cart = [];
            if(window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }

            if(cart.indexOf(String(id))==-1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible=1;
            }
        },

        checkInCart:function() {
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !=-1) this.btnVisible=1;
        },
        getCart: function() {
            var cartItems = localStorage.getItem('cart');
            if (cartItems) {
                var cartIds = cartItems.split(',');
                this.cart = this.products.filter(product => cartIds.includes(String(product.id)));
            }
        },
        removeFromCart: function(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            var cartItems = localStorage.getItem('cart');
            if (cartItems) {
                var cartIds = cartItems.split(',').filter(itemId => itemId !== String(id));
                localStorage.setItem('cart', cartIds.join());
            }
        },
        makeOrder: function() {
            this.orderInfo = { ...this.contactFields };
            this.cart = [];
            localStorage.removeItem('cart');
            
            this.contactFields = {
                name: '',
                companyName: '',
                position: '',
                city: '',
                country: '',
                telephone: '',
                email: '',
                userType: 'seed producer',
                otherType: '',
                interest: ''
            };

            this.showOrderInfo = true;
            this.showTableHeaders = false;
        }
    }
});
