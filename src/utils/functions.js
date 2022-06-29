export const isAuthenticated = () => {
    let token = sessionStorage.getItem("token");
    console.log(token)
    if(token == null) {
        return false;
    }

    return true;

    


}

export const postApiCall = async (url,info) => {
    const apiCall = await fetch(url,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(info)
    })
    .then((res) => {
        if(res.status === 200) {
            return res.json()
        }
    })
    .then((data) => {
        return data
    })
    .catch((error) => {
        console.log(error.message)
    })

    if(apiCall) {
        return apiCall
    }
}

export const putApiCall = async (link,info) => {
    const loginApiCall = await fetch(link,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(info)
    })
    .then((res) => {
        if(res.status === 200) {
            return res.json()
        }
    })
    .then((data) => {
        return data
    })
    .catch((error) => {
        console.log(error.message)
    })

    if(loginApiCall) {
        return loginApiCall
    }
}

export const deleteApiCall = async (link,info) => {
    const apiCall = await fetch(link, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }

    })
    .then((res) => {
        if(res.status === 200) {
            return res.json()
        }
    })
    .then((data) => {
        return data
    })
    .catch((error) => {
        console.log(error.message)
    })

    if(apiCall) {
        return apiCall
    }
}

export const getApiCall = (url) => {
    const apiCall = fetch(url,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
        
    })
    .then((res) => {
        
        if(res.status === 200) {
            return res.json()
        }
    })
    .then((data) => {
        
        return data
    })
    .catch((error) => {
        console.log(error.message)
    })

    if(apiCall) {
        return apiCall
    }
}

