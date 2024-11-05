export const createContact = async (email: any) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key":
          "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",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create contact");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error, "Error");
  }
};
