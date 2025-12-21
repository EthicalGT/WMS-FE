const BASE_URL = "http://127.0.0.1:8000/api";

export async function verifyOTP(data) {
    try {
        const res = await fetch(`${BASE_URL}/hawker/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            let errorMessage = "Server error. Please try again later.";

            try {
                const errorData = await res.json();
                errorMessage = errorData.message || errorMessage;
            } catch (_) { }

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