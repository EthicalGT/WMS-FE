const BASE_URL = "http://127.0.0.1:8000/api"; 

export async function registerHawkerUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/hawker/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      let errorMessage = "Server error. Please try again later.";

      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {}

      return {
        success: false,
        message: errorMessage,
      };
    }

    return await res.json();

  } catch (error) {
    return {
      success: false,
      message: "Network issue. Please check your internet connection.",
    };
  }
}

export async function loginHawkerUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/hawker/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMessage = "Login failed. Please try again.";

      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {}

      return {
        success: false,
        message: errorMessage,
      };
    }

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: "Network issue. Please check your internet connection.",
    };
  }
}

export async function registerVendorUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/vendor/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMessage = "Registration failed. Please try again.";

      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {}

      return {
        success: false,
        message: errorMessage,
      };
    }

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: "Network issue. Please check your internet connection.",
    };
  }
}

export async function loginVendorUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/vendor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorMessage = "Login failed. Please try again.";

      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (_) {}

      return {
        success: false,
        message: errorMessage,
      };
    }

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: "Network issue. Please check your internet connection.",
    };
  }
}
