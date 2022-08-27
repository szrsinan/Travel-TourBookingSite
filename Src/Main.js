var TraipTravel = angular.module('TraipTravel',['MyServiceModule','MyFactoryModule']);
TraipTravel.controller('TraipTravelController', function($scope, $http, $window, TraipTravelService,TraipTravelFactory){

    $scope.Coupon;
    $scope.User =[];
    $scope.TxtInput;
    $scope.Discount=0;
    $scope.Blogs = [];
    $scope.Tours = [];
    $scope.Talks = [];
    $scope.Places= [];
    $scope.Hotels = [];
    $scope.TotalPrice=0;
    $scope.Products= [];
    $scope.Partners = [];
    $scope.ImportantLinks = [];
    $scope.ProductNumber=0;
    $scope.ShoppingList = [];
    $scope.QuickLinks = [];
    $scope.TourVideoCategory = [];
    $scope.AccountName = "";

    
    $scope.LoginRegisterForm = function() {
        TraipTravelService.DoLogin($scope.User);
    };

    $scope.GetData = function(){
        console.log(User);
        $scope.AccountName = "Login/Register";
        $scope.CreateCoupon();
        $scope.Blogs = Blogs;
        $scope.User = User;
        $scope.Tours = Tours;
        $scope.Talks = Talks;
        $scope.Places = Places;
        $scope.Hotels = Hotels;
        $scope.QuickLinks = QuickLinks;
        $scope.ImportantLinks = ImportantLinks;
        $scope.TotalPrice=0;
        $scope.ProductNumber=0;
        $scope.Products= Products;
        $scope.Partners = Partners;
        $scope.ShoppingList = ShoppingList;
        $scope.TourVideoCategory = TourVideoCategorys;
    };

    $scope.CreateCoupon = function(){
        $scope.Coupon=TraipTravelService.DoCreateCoupon(5, '0aA');
    };

    $scope.CheckTour = function (Id,ModalName) { 
        TraipTravelService.DoCheckTour(Id, ModalName, Tours);
    };

    $scope.CheckContactInputs = function() {
        TraipTravelService.DoCheckContactInputs();
    };

    $scope.SendBlogData = function (Id) {
        TraipTravelService.DoCheckBlog(Id, Blogs);
    };

    $scope.SendPartnerData = function (Id) {
        TraipTravelService.DoCheckPartner(Id, Partners);
    };

    $scope.AddToCard = function (ProductId) {
        TraipTravelService.DoAddToCard(ProductId,Products,ShoppingList);
        $scope.ProductNumber = ShoppingList.length;
        $scope.SubTotal();
    };

    $scope.FillTourModal = function(){
        TraipTravelService.DoFillTourModal()
    };
    
    $scope.SendTourData = function(Id) {
        TraipTravelService.DoFillTourModal(Id, Tours);
    };

    $scope.CloseShoppingListItem = function (ProductId){
        TraipTravelFactory.DoCloseShoppingListItem(ProductId,ShoppingList);
        $scope.SubTotal();
    };

    $scope.QuantityDecrease = function (ProductId){
        TraipTravelFactory.DoQuantityDecrease(ProductId,ShoppingList);
        $scope.SubTotal();
    };

    $scope.QuantityIncrease = function (ProductId){
        TraipTravelFactory.DoQuantityIncrease(ProductId,ShoppingList);
        $scope.SubTotal();
    };

    $scope.SubTotal = function(){
        $scope.TotalPrice = TraipTravelFactory.DoSubTotal($scope.TotalPrice,ShoppingList);
    };

    $scope.AddCoupon = function(){
        $scope.Discount = TraipTravelFactory.DoAddCoupon($scope.Coupon,$scope.TxtInput,$scope.Discount);
    };

    $scope.PlaceSearch = function(){
        var Select = document.getElementById('travelType');
        if(Select.options[Select.selectedIndex].value === "3"){
            TraipTravelService.DoPlaceSearch(3);
        }
        else if(Select.options[Select.selectedIndex].value === "2"){
            TraipTravelService.DoPlaceSearch(2);
        }
        else if(Select.options[Select.selectedIndex].value === "4"){
            TraipTravelService.DoPlaceSearch(4);
        }
    };
    $scope.Filter = function(){
        TraipTravelService.DoFilter($scope.Tours,$scope.Places,$scope.Hotels);
    };
    $scope.NotFound = function(){
        TraipTravelService.DoNotFound();
    }
}); 