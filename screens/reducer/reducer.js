const initialState = {
  vehicle: [],
  // counter:0,
  // counterNO:0,
  // cartid:0,
  paypal_payment: [],
  user: [],
  location: [],
  social_user: [],
  finger_touch: false,
  check_support:[],
 
  Status1: "sta",
  Status2: "stat",
 
};

const reducer = (state = initialState, action) => {
 

  if (action.type === "Status") {
    return {
      ...state,
      Status1: action.payload,      
    };
  }

  if (action.type === "Status1") {
    return {
      ...state,
      Status2: action.payload,      
    };
  }
  
  return state;
};

export default reducer;
