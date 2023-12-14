"use client";
import React from "react";
import { staatliches, jura } from "@/fonts";

const EmailForm = () => {
	const handleSubmit = async (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		const name = event.target.name.value; // New field for the name

		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, name }), // Include all data in the body
			});

			const result = await response.json();
			// Handle the response...
		} catch (error) {
			// Handle errors...
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			id="realityDesignerForm"
			className={`${staatliches.className} flex flex-col space-y-4`}
		>
			<h2 className="text-4xl uppercase text-gray-200 font-bold text-center">
				Join Newsletter
			</h2>

			<input
				type="text"
				name="name"
				id="name"
				required
				placeholder="Your Name"
				className="p-2 bg-gray-200 border border-gray-500 rounded-md"
			/>

			<input
				type="email"
				name="email"
				id="email"
				required
				placeholder="yourname@example.com"
				className="p-2 bg-gray-200 border border-gray-500 rounded-md"
			/>

			<button
				type="submit"
				className="border uppercase tracking-wide bg-black  border-gray-200 text-white py-2 px-4 rounded-md hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
			>
				{" "}
				Send
			</button>
		</form>
	);
};

export default EmailForm;
