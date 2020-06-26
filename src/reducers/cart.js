
import * as types from './../constants/ActionType';

var initialState = {
   Cart:[],
   Carts:[],
};

const cart = (state = initialState, action) => {
   switch (action.type) {
      case types.ADD_TO_CART:
         var gioHang = {
            "id": action.item.id,
            "sanpham_ten": action.item.sanpham_ten,
            "qty": action.item.qty,
            "gia_tien": action.item.gia_tien,  
            "sanpham_anh_app": action.item.sanpham_anh_app,     
            "sanpham_anh": action.item.sanpham_anh,
            "subtotal": action.item.gia_tien,      
            "sanpham_mo_ta": action.item.sanpham_mo_ta,
            "loaisanpham_id": action.item.loaisanpham_id,
            "donvitinh_id": action.item.donvitinh_id,           
            "phan_tram_km": action.item.phan_tram_km ,
            "donvi_id": action.item.donvi_id,
            "shop_id": action.item.shop_id,
            "lohang_id": action.item.lohang_i,
            "tenshop": action.shop.tenshop,
            "donvitinh": action.donvitinh,          
         }
         var exists = false;
        
         var ar = state;
         var b = state.Cart.length;
         var newState;
         console.log('ar :'+ JSON.stringify(ar));
         if( b != 0)
            {
               newState = state.Cart.map(item => {
               if (item.id === gioHang.id) {
                  exists = true;
                  console.log(gioHang.id+" "+item.id);
                  //console.log("item :  "+item);
                  return {
                     ...item,
                     // quantity: item.quantity + 1
                     qty: item.qty + 1,
                     subtotal: item.subtotal * item.qty
                  }
               } else {
                  return item
               }
            });
         }
         var re;
            if(exists === false)
               { 
                  state.Cart.push(gioHang);
                  console.log('gio :'+ JSON.stringify(state));
                   re ={...state};
               }
            else{
                re ={...state, Cart :newState};
            }
            return re;

            // return { ...state, ...{Cart: [gioHang ]}};
         
      case types.REMOVE_FROM_CART:
         const remaingList = [
            ...state.Cart.filter(i => i.id !== action.item.id)
         ];
         return {...state, Cart :remaingList};
      case types.CHIA_CARD:
         //sap xep san pham theo shop
         var GioHangNew = [];
         var a=0;
         var GioHang = action.cart;//action.cart;
         while(GioHang != ""){
            GioHangNew[a] = GioHang.filter(i=>i.shop_id === GioHang[0].shop_id);
            a = a+1;
            GioHang = GioHang.filter(i=>i.shop_id !== GioHang[0].shop_id);
         }
         //alert(GioHangNew.length);
         console.log("gio hang :"+JSON.stringify(GioHangNew));
          return {...state, Carts: GioHangNew};
         // var ages = [{"id":"1","ten":"a"},{"id":"1","ten":"b"},{"id":"4","ten":"r"},{"id":"3","ten":"trieu nef"}];
         // var agess=[];
         // var a=0;
         // var age = ages;
         // while(age != ""){
         // agess[a] = age.filter(i=>i.id === age[0].id);
         // a = a+1;
         // age=age.filter(i=>i.id !== age[0].id);
         // }
         // alert(agess[0].length);
         // console.log(JSON.stringify(agess));
         // return agess[2][0].ten;

      case types.UP_QUANTITY_CART:
         var exists = false;
         const upQuantity = state.Cart.map(item => {
            if (item.id === action.item.id) {
               exists = true;
               return {
                  ...item,
                  // quantity: item.quantity + 1
                  qty: item.qty + 1,
               }
            } else {
               return item;
            }
         });
         if (exists) {
            return { ...state, Cart: upQuantity };;
         }
         else {
            return {...state}
         }

      case types.DOWN_QUANTITY_CART:
         var exists = false;
         const downQuantity = state.Cart.map(item => {
            if (item.id === action.item.id) {
               exists = true;
               if (item.qty <= 1) {
                  return {
                     ...item,
                     // quantity: item.quantity + 1
                     qty: 1,
                  }
               } else {
                  return {
                     ...item,
                     // quantity: item.quantity + 1
                     qty: item.qty - 1,
                  }
               }
            }
            else {
               return item;
            }
         });
         if (exists) {
            return { ...state, Cart: downQuantity };
         } else {
            return {...state};
         }

         case types.LOI:
            {
               alert('Đăng nhập để mua hàng');
            }
         case types.LOI1:
            {
               alert('Chưa chon hình thức thanh toán');
            }
         case types.REMOVE_CART:
            {
               state = initialState;
               return state;
            }
        
      default: return {...state};
   }
}

export default cart;