/**
 * Client-side bridge to send contact form emails via an API Route.
 * Replaces the "use server" action which is incompatible with the Pages Router.
 * @param {Object} data - The form data object
 */
export async function sendContactEmail(data) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `Unexpected response from server (Status ${response.status}). Please contact support.`
      );
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send email");
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error, please try again.",
    };
  }
}
