var MyFactory = angular.module('MyFactoryModule', []);
MyFactory.factory('TraipTravelFactory', function ($http, $q) {
    return {
        DoCloseShoppingListItem: function(ProductId,ShoppingList){
            ShoppingList.forEach((ListItem,Index)=>{
                if(ProductId===ListItem.Id){
                    var Delete = ShoppingList.findIndex(x=>x.Id===ProductId)
                    ShoppingList.splice(Delete,1);
                }
            });
        },
        
        DoQuantityDecrease: function(ProductId,ShoppingList){
            ShoppingList.forEach((Item)=>{
                if(Item.Id===ProductId){
                    if(Item.Quantity > 1){
                        Item.Quantity-=1;
                    }
                    else{
                        let timerInterval
                        Swal.fire({
                            icon: 'warning',
                            title: Item.Title + " 1 adet bulunuyor. Ürün 1'den az olamaz!",
                            timer: 1500,
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        })
                    }
                }
            });
        },
    
        DoQuantityIncrease: function(ProductId,ShoppingList){
            ShoppingList.forEach((Item)=>{
                if(Item.Id===ProductId){
                        Item.Quantity+=1;
                }
            });
        },

        DoSubTotal: function(TotalPrice,ShoppingList){
            var Total=0;
            TotalPrice =0;
            ShoppingList.forEach((Item)=>{
                Total = Item.Quantity*Item.Price;
                TotalPrice+=Total;
            });
            return TotalPrice;
        },
        
        DoAddCoupon: function(Coupon,TxtInput,Discount){
            
            let timerInterval
            if(Coupon===TxtInput){
                    Swal.fire({
                        icon: 'success',
                        title: "Tebrikler, Kupon Uygulandı!",
                        timer: 2000,
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                
                Discount = 20;
                return Discount;
            }
            else{
                Swal.fire({
                    icon: 'warning',
                    title: "Kupon Kodu Yanlış Girildi!",
                    timer: 2000,
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                })
            }
        }
    };
});