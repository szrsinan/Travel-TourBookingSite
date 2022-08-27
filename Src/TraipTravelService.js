var MyModule = angular.module('MyServiceModule', []);
MyModule.service('TraipTravelService', function ($http, $timeout, $window, $q) {

    this.DoLogin = function(User) {

        let name = "";

        $(document).on('click', '.register', function() {
            Swal.fire({
                title: 'Register Form',
                html: `
                <input type="text" id="username" class="swal2-input" placeholder="Username">
                <input type="password" id="password" class="swal2-input" placeholder="Password">
                <input type="password" id="repassword" class="swal2-input" placeholder="RePassword">
                <input type="email" id="email" class="swal2-input" placeholder="Email">
                <input type="phone" id="phone" class="swal2-input" placeholder="Phone Number (Optional)">
                <br><br>
                <i>Already Have an Account?
                <button class="login" style="background-color: white; color:blue;"><i><u>Login</button>
                `,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                confirmButtonText: 'Register',
                focusConfirm: false,
                preConfirm: () => {
                    const username = Swal.getPopup().querySelector('#username').value
                    const password = Swal.getPopup().querySelector('#password').value
                    const repassword = Swal.getPopup().querySelector('#repassword').value
                    const email = Swal.getPopup().querySelector('#email').value
                    if (!username && !password && !repassword && !email) {
                        Swal.showValidationMessage(`More than one field is empty. Please fill fields.`)
                    }
                    else if (!username) {
                        Swal.showValidationMessage(`Please enter username`)
                    }
                    else if (!password){
                        Swal.showValidationMessage(`Please enter password`)
                    }
                    else if (!repassword){
                        Swal.showValidationMessage(`Please enter repassword`)
                    }
                    else if (repassword !== password){
                        Swal.showValidationMessage(`Passwords does not match!`)
                    }
                    else if (!email){
                        Swal.showValidationMessage(`Please enter email address`)
                    }
                    return { username: username }
                }
                }).then((result) => {

                    const Iusername = Swal.getPopup().querySelector('#username').value
                    const Ipassword = Swal.getPopup().querySelector('#password').value
                    const Iemail = Swal.getPopup().querySelector('#email').value
                    User.push({ userName: Iusername, userPassword: Ipassword, userEmail:Iemail});
                    console.log(User);
                    
                    if (username.value && password.value) {

                        name = `${result.value.username}`;
                        document.getElementById("NameButton").innerText = "Welcome " + name;
                        document.getElementById("NameButton").disabled = true;

                        let timerInterval
                        Swal.fire({
                            icon:'success',
                            title: 'Successfully registered ' + name + '! <br> You are redirecting to the page',
                            html: '',
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading()
                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log('I was closed by the timer')
                            }
                        })
                    }
                    return {}
                })
        });

        $(document).on('click', '.login', function() {
            
            Swal.fire({
            
                title: 'Login Form',
                html: `
                <input type="text" id="username" class="swal2-input" placeholder="Username">
                <input type="password" id="password" class="swal2-input" placeholder="Password">
                <br><br>
                <i>Still don't have an account? 
                <button class="register" style="background-color: white; color:blue;" ><i><u>Register</button>
                `,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                confirmButtonText: 'Login',
                focusConfirm: false,
                preConfirm: () => {
                    const username = Swal.getPopup().querySelector('#username').value
                    const password = Swal.getPopup().querySelector('#password').value
                    if (!username && !password) {
                        Swal.showValidationMessage(`Please enter username and password`)
                    }
                    else if (!username) {
                        Swal.showValidationMessage(`Please enter username`)
                    }
                    else if (!password){
                        Swal.showValidationMessage(`Please enter password`)
                    }
                    return { login: username }
                }
                }).then((result) => {
                    const username = Swal.getPopup().querySelector('#username').value
                const password = Swal.getPopup().querySelector('#password').value
                let timerInterval;
                var count=0;
                if (username && password) {
                    
                    User.forEach((UserItem)=>{
                            if(UserItem.userName == username){
                                if(UserItem.userPassword == password){
                                    name = `${result.value.login}`;
                                    document.getElementById("NameButton").innerText = "Welcome " + name;
                                    document.getElementById("NameButton").disabled = true;
                                    
                                    Swal.fire({
                                        icon:'success',
                                        title: 'Successfully logged in ' + name + '!',
                                        html: '',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                            b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    })
                                }
                                else{
                                    Swal.fire({
                                        icon:'error',
                                        title: '',
                                        html: 'Invalid Username or Password',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                            b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    })
                                }
                                count++;
                            }
                            else{
                                if(count==0){
                                    Swal.fire({
                                        icon:'error',
                                        title: '',
                                        html: 'Invalid Username or Password',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                            b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    })
                                }
                            }
                        
                    })
                }
                return {}  
                })
        });

        Swal.fire({

            title: 'Login Form',
            html: `
            <input type="text" id="username" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
            <br><br>
            <i>Still don't have an account? 
            <button class="register" style="background-color: white; color:blue;" ><i><u>Register</button>
            `,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonText: 'Login',
            focusConfirm: false,
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#username').value
                const password = Swal.getPopup().querySelector('#password').value
                if (!username && !password) {
                    Swal.showValidationMessage(`Please enter username and password`)
                }
                else if (!username) {
                    Swal.showValidationMessage(`Please enter username`)
                }
                else if (!password){
                    Swal.showValidationMessage(`Please enter password`)
                }
                return { login: username }
            }
            }).then((result) => {
                const username = Swal.getPopup().querySelector('#username').value
                const password = Swal.getPopup().querySelector('#password').value
                let timerInterval;
                var count=0;
                if (username && password) {
                    
                    User.forEach((UserItem)=>{
                            if(UserItem.userName == username){
                                if(UserItem.userPassword == password){
                                    name = `${result.value.login}`;
                                    document.getElementById("NameButton").innerText = "Welcome " + name;
                                    document.getElementById("NameButton").disabled = true;
                                    
                                    Swal.fire({
                                        icon:'success',
                                        title: 'Successfully logged in ' + name + '!',
                                        html: '',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                            b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    })
                                }
                                else{
                                    Swal.fire({
                                        icon:'error',
                                        title: '',
                                        html: 'Invalid Username or Password',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                            b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    })
                                }
                                count++;
                            }
                            else{
                                if(count==0){
                                    Swal.fire({
                                        icon:'error',
                                        title: '',
                                        html: 'Invalid Username or Password',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            const b = Swal.getHtmlContainer().querySelector('b')
                                            timerInterval = setInterval(() => {
                                            b.textContent = Swal.getTimerLeft()
                                            }, 100)
                                        },
                                        willClose: () => {
                                            clearInterval(timerInterval)
                                        }
                                    })
                                }
                            }
                        
                    })
                }
                return {}
            })
        return ;
    }

    this.DoCheckTour = function (CategoryId,ModalName, Tours) {

        var DvTour = document.getElementById(ModalName);
        var CategoryTours = `<span></span>`;
        DvTour.innerHTML = CategoryTours;
        
        Tours.forEach((Item)=>{          
            if (Item.Id === CategoryId) {
                CategoryTours += `
                <div class="col-md-6 col-lg-4 pb-30">
                    <div class="card-2">
                        <div class="card-2-image">
                            <img src="${Item.ImgUrl}" alt="tour">
                        </div>
                        <div class="card-2-content">
                            <ul class="card-2-entry">
                                <li><i class="flaticon-calendar"></i>${Item.Length} Days</li>
                            </ul>
                            <div class="card-2-info">
                                <h3><a href="single-tour.html">${Item.Title}</a></h3>
                                <div class="card-2-info-price">${Item.Price}<span>/per</span></div>
                            </div>
                            <p>${Item.Description}</p>
                            <div class="card-2-footer">
                                <div class="card-2-reviews">
                                    <ul class="review-star">
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                    </ul>
                                    <span>(${Item.TotalReviews} Reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

                DvTour.innerHTML = CategoryTours;
            };
        });
    };

    this.DoCheckBlog = function (BlogId, Blogs) {
        
        var blogModal = document.getElementById('blogModal')
        var modalTitle = blogModal.querySelector('.modal-title')
        var modalBody = blogModal.querySelector('.modal-body')
        Blogs.forEach((Item)=>{
            if (Item.Id === BlogId) {
                modalTitle.textContent = Item.Title
                modalBody.innerHTML = `
                    <img src="${Item.ImgUrl}">
                    <ul class="blog-entry mt-10">
                        <li>
                            <i class="flaticon-calendar"></i>
                            ${Item.Date}
                        </li>
                        <li>
                            <i class="flaticon-user-1"></i>
                            ${Item.Person}
                        </li>
                    </ul>
                    <hr>${Item.Content}`
            }
        })

    };
    
    this.DoCheckPartner = function (PartnerId, Partners) {

        var partnerModal = document.getElementById('partnerModal')
        var modalTitle = partnerModal.querySelector('.modal-title')
        var modalBody = partnerModal.querySelector('.modal-body')
        Partners.forEach((Item)=>{
            if (Item.Id === PartnerId) {
                modalTitle.textContent = Item.Name
                modalBody.innerHTML = `<img src="${Item.ImgUrl}" class="float-start">${Item.Content}`
            }
        })
    };

    this.DoAddToCard = function (CardId,Product,ShoppingList){
        var Result = 1;
        let timerInterval
        Swal.fire({
            icon: 'success',
            title: 'Product successfully added',
            timer: 1500,
            willClose: () => {
                clearInterval(timerInterval)
            }
        })

        Product.forEach((ProductItem)=>{
            if(ProductItem.Id === CardId){
                ShoppingList.forEach((ListItem)=>{
                    if(CardId=== ListItem.Id){
                        Result++;
                        ListItem.Quantity= ListItem.Quantity+1;
                    }
                });
                if(Result===1){
                    var Card = {
                        Id:CardId,
                        Title:ProductItem.Title,
                        ImgUrl:ProductItem.ImgUrl,
                        Price:ProductItem.Price,
                        Quantity:1
                    }
                    ShoppingList.push(Card);
                }
            }
        });
    };

    this.DoFillTourModal = function (TourId, Tours){
        let TourModal = document.getElementById("LikedTourModal");
        let TourTitle = document.getElementById("TourTitle");
        let TourDescription = document.getElementById("TourDescription");
        let TourImage = document.getElementById("TourImage");
        let TourLength = document.getElementById("TourLength");
        let TourPrice = document.getElementById("TourPrice");

        for (let i = 0; i < Tours.length; i++) {
            if(TourId==Tours[i].Id){
            TourTitle.innerText= Tours[i].Title;
            TourImage.src = Tours[i].ImgUrl;
            TourDescription.innerText = Tours[i].Description;
            TourLength.innerText = Tours[i].Length + " " + "Days";
            TourPrice.innerText = Tours[i].Price + " " + "$" ;
            }
        }
        
    };

    this.DoCheckContactInputs = function (){
        let flag;
        flag=0;
        let FormInputs = document.getElementsByClassName("form-input");
        let MailInput = document.getElementById("email").value;
        let PhoneNumberInput = document.getElementById("phone").value;

        console.log(PhoneNumberInput);
        for(let i=0; i<FormInputs.length; i++){
        if(FormInputs[i].value==""){
            flag=1
            }
        }
        if((document.getElementById("check1").checked)==false){
            flag=1;
            swal.fire("Error!", "You must accept terms & condition & privacy policy.", "error");
        }
        else if(!(MailInput.includes(".")) || !(MailInput.includes("@"))){
            flag=1;
            swal.fire("Error!", "Your mail adress must contain @ and .", "error");
        }    
        if(flag==0){
            swal.fire("Good job!", "You clicked the button!", "success");
            $('.swal2-confirm').click(function() {
                $('#ContactModal').modal('hide');

                
            })
            
            for(let j=0; j<FormInputs.length; j++){
                FormInputs[j].value = "";
                console.log(FormInputs[j]);
            }
            
        }
        
    };

    this.DoCreateCoupon = function(uzunluk, sembol){
        var maske ='';
        if (sembol.indexOf('a') > -1) maske += 'abcdefghijklmnopqrstuvwxyz';
        if (sembol.indexOf('A') > -1) maske += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (sembol.indexOf('0') > -1) maske += '0123456789';
        var sonuc = '';
        
        for (var i = uzunluk; i > 0; --i) 
        {
        sonuc += maske[Math.floor(Math.random() * maske.length)];
        }
        
        Swal.fire({
            icon: 'info',
            title: 'Your One-Time Discount Coupon',
            showDenyButton: true,
            html: sonuc,
            confirmButtonText: 'Copy Coupon Code',
            denyButtonText: 'Continue Without Coupon',
        }).then((result) =>{
            let timerInterval
            if(result.isConfirmed){
                navigator.clipboard.writeText(sonuc);
                    Swal.fire({
                        icon: 'success',
                        title: "Coupon Copied!",
                        html: "You can just paste it and enjoy the sale!",
                        timer: 1750,
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                } else if(result.isDenied){
                    Swal.fire({
                        icon: 'info',
                        title: "You are redirecting to the page without copied the coupon",
                        timer: 2000,
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                }
            })
    

        return sonuc;
    };

    this.DoPlaceSearch = function(Places){
        console.log(Places);
        
        if(Places == 2){
            document.querySelectorAll('.Hotels').forEach(function(el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.Tours').forEach(function(el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.Holiday').forEach(function(el) {
                el.style.display = "initial";
            });
        }else if(Places == 3){
            document.querySelectorAll('.Holiday').forEach(function(el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.Hotels').forEach(function(el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.Tours').forEach(function(el) {
                el.style.display = "initial";
            });
        }else if(Places == 4){
            document.querySelectorAll('.Tours').forEach(function(el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.Holiday').forEach(function(el) {
                el.style.display = "none";
            });
            document.querySelectorAll('.Hotels').forEach(function(el) {
                el.style.display = "initial";
            });
        }
    };

    this.DoFilter = function(Tours, Places, Hotels){
        
        var SearchModal = document.getElementById("SearchModal");
        var SearchType = document.getElementById("travelType");
        var Place = document.getElementById("location");
        var InputDate = document.getElementById("InputDate");
        var Guest = document.getElementById("Guest");

        var SearchTypeText = SearchType.options[SearchType.selectedIndex].text;
        var PlaceText = Place.options[Place.selectedIndex].text;
        var InputDateText = InputDate.value;
        var GuestText = Guest.value;
        
        if(SearchTypeText == "Tours"){
            var ModalOutput = "";
            Tours.forEach((Item)=>{
                if(Item.City == PlaceText){
                    ModalOutput += `<div class="item">
                                        <div class="card-2">
                                            <div class="card-2-image">
                                                <img src="${Item.ImgUrl}" alt="popular package">
                                            </div>
                                            <div class="card-2-content">
                                                <ul class="card-2-entry">
                                                    <li>
                                                        <i class="flaticon-calendar">${Item.Length} Days</i>
                                                    </li>
                                                </ul>
                                                <div class="card-2-info">
                                                    <h3>
                                                        <a href="single-tour.html">${Item.Title}</a>
                                                    </h3>
                                                    <div class="card-2-info-price">$${Item.Price}<span>/per</span></div>
                                                </div>
                                                <p>${Item.Description}</p>
                                                <div class="card-2-footer">
                                                    <div class="card-2-reviews">
                                                        <ul class="review-star">
                                                            <li class="full-star"><i class="flaticon-star"></i></li>
                                                            <li class="full-star"><i class="flaticon-star"></i></li>
                                                            <li class="full-star"><i class="flaticon-star"></i></li>
                                                            <li class="full-star"><i class="flaticon-star"></i></li>
                                                            <li class="full-star"><i class="flaticon-star"></i></li>
                                                        </ul>
                                                        <span>${Item.TotalReviews} Reviews</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                }
            })
            SearchModal.innerHTML = ModalOutput;
            $('#fgModal').modal('show');
        }
        else if (SearchTypeText == "The Package Holiday"){
            var ModalOutput = "";
            Places.forEach((Item)=>{
                if(Item.City == PlaceText){
                    if(GuestText<Item.Person){
                        let timerInterval
                        Swal.fire({
                            icon: 'warning',
                            title: PlaceText+ " İçin Kişi Sayısı " + Item.Person+"'dan Az Olamaz!",
                            timer: 3000,
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        })
                    }
                    else{
                            
                            Places.forEach((ItemValue)=>{
                                if(ItemValue.City == PlaceText){
                                    ModalOutput += `<div class="col-sm-12 col-lg-12 col-xl-12 pb-30">
                                    <div class="card-1">
                                        <div class="card-1-image">
                                            <div class="card-1-overlay">
                                                <a href="single-destination.html">
                                                    <img src="${ItemValue.ImgUrl}" alt="holiday">
                                                </a>
                                                <ul class="card-1-entry">
                                                    <li>
                                                        <i class="flaticon-calendar" >${ItemValue.Date}</i>
                                                    </li>
                                                    <li>
                                                        <i class="flaticon-user-1" > ${ItemValue.Person} +</i>
                                                    </li>
                                                    <li>
                                                        <i class="flaticon-placeholder-point">${ItemValue.Region}</i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card-1-redirect">
                                                <a href="single-destination.html">
                                                    <i class="flaticon-export"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="card-1-content">
                                            <div class="card-1-info">
                                                <h3>
                                                    <a href="single-destination.html">${ItemValue.City}</a>
                                                </h3>
                                                <div class="card-1-reviews">
                                                    <ul class="review-star">
                                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                                    </ul>
                                                    <span>${ItemValue.TotalReviews}</span>
                                                </div>
                                            </div>
                                            <p>${ItemValue.Description}</p>
                                        </div>
                                    </div>
                                </div>`;
                                }});
                            
                            SearchModal.innerHTML = ModalOutput;
                            $('#fgModal').modal('show');
                    }


                    
                }
            })
        }
        else if (SearchTypeText == "Hotels"){
            var ModalOutput = "";
            Hotels.forEach((Item)=>{
                if(Item.City == PlaceText){
                    ModalOutput += `<div class="item">
                    <div class="card-2">
                        <div class="card-2-image">
                            <img src="${Item.ImgUrl}" alt="popular package">
                        </div>
                        <div class="card-2-content">
                            <ul class="card-2-entry">
                                <li>
                                    <i class="flaticon-calendar">${Item.City}</i>
                                </li>
                            </ul>
                            <div class="card-2-info">
                                <h3>
                                    <a href="single-tour.html">${Item.Title}</a>
                                </h3>
                                <div class="card-2-info-price">${Item.Price}<span>/${Item.Period}</span></div>
                            </div>
                            <p>${Item.Description}</p>
                            <div class="card-2-footer">
                                <div class="card-2-reviews">
                                    <ul class="review-star">
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                        <li class="full-star"><i class="flaticon-star"></i></li>
                                    </ul>
                                    <span>${Item.Review} Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            })
            SearchModal.innerHTML = ModalOutput;
            $('#fgModal').modal('show');
        }
    };
    this.DoNotFound = function() {
        
        Swal.fire({
            html: 'Our team working for App. Thanks for your attention.',
            confirmButtonText: 'Continue to the website',
            imageUrl: '../assets/images/maintenance.jpg',
            imageWidth: "521px",
            imageHeight: "521px",
        })
    }

});