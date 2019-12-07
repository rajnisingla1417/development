import Constants from "./Constants";

export const getCountries = () => {

    return fetch(Constants.SERVER_BASE_URL + 'get-countries' , {
        method: 'GET' ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            debugger
            return error;
        });

};


export const getVehicleMaker = () => {

    debugger
    return fetch(Constants.SERVER_BASE_URL + 'get-maker' , {
        method: 'GET' ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            debugger
            return error;
        });

};


export const getVehicleModal = (vehicleMaker) => {

    return fetch(Constants.SERVER_BASE_URL + 'get-model' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: JSON.stringify({
            maker: vehicleMaker ,

        }) ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

}


export const getModalYear = (modal) => {

    return fetch(Constants.SERVER_BASE_URL + 'get-year' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: JSON.stringify({
            model: modal ,

        }) ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

}


export const getVehicleSearch = (maker , modal , year , ratingCount , country) => {

    let bb = JSON.stringify({
        model: modal ,
        maker: maker ,
        year: year ,
        rating: ratingCount ,
        country: country

    });


    // console.log(JSON.stringify(bb))

    debugger

    return fetch(Constants.SERVER_BASE_URL + 'vehicle-serach' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bb ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

};


export const getVehiclesCompare = (vehicleIds) => {

    let bb = JSON.stringify({

        id: vehicleIds

    });

//    console.log(JSON.stringify(bb))

    debugger

    return fetch(Constants.SERVER_BASE_URL + 'vehicle-compare' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bb ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

};

//getVehicleDetail

export const getVehicleDetail = (vehicleIds) => {

    let bb = JSON.stringify({

        id: vehicleIds

    });

    return fetch(Constants.SERVER_BASE_URL + 'vehicle-detail' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bb ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

};

export const contactUs = (name,email,subject,message) => {

    let bb = JSON.stringify({

        name,email,subject,message

    });

    return fetch(Constants.SERVER_BASE_URL + 'contact' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bb ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

};

export const loginAPi = (email,password) => {

    let bb = JSON.stringify({
        email:email,
        password:password

    });

    return fetch(Constants.SERVER_BASE_URL + 'login' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bb ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

}



export const postAPi = (url,bdy) => {


    return fetch(Constants.SERVER_BASE_URL + url , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bdy ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

}





export const signupApi = (firstName,lastName,email,password) => {

    let bb = JSON.stringify({

        first_name: firstName,
        last_name:lastName,
        email:email,
        password:password

    });

    return fetch(Constants.SERVER_BASE_URL + 'signup' , {
        method: 'POST' ,
        headers: {
            Accept: 'application/json' ,
            'Content-Type': 'application/json' ,
        } ,
        body: bb ,
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return error;
        });

};
