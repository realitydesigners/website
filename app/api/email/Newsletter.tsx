"use client";
import { cairo, monomaniac } from "@/fonts";
import React, { useState } from "react";

type SubmissionStatus = "success" | "error" | "submitting" | null;

const EmailForm = () => {
	const [submissionStatus, setSubmissionStatus] =
		useState<SubmissionStatus>(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmissionStatus("submitting"); // Set the state to 'submitting' as soon as the form is submitted
		const email = event.target.email.value;
		const name = event.target.name.value;

		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, name }),
			});

			const result = await response.json();

			setSubmissionStatus("success");
		} catch (error) {
			setSubmissionStatus("error");
		}
	};

	const FeedbackMessage = ({ message }) => (
		<div className="flex justify-center items-center mt-4 p-6">
			<p
				className={`${monomaniac.className} text-3xl text-center text-gray-200 font-bold`}
			>
				{message}
			</p>
		</div>
	);

	return (
		<div className=" w-full  p-6  border-gray-600 border rounded-lg ">
			{submissionStatus === "submitting" ? (
				<FeedbackMessage message="Sending..." />
			) : submissionStatus === "success" ? (
				<FeedbackMessage message="Thank you for subscribing!" />
			) : submissionStatus === "error" ? (
				<FeedbackMessage message="Error submitting the form. Please try again." />
			) : (
				<form
					onSubmit={handleSubmit}
					id="realityDesignerForm"
					className={`${monomaniac.className} flex flex-col space-y-4`}
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
						className="border uppercase tracking-wide bg-black border-gray-200 text-gray-200 py-2 px-4 rounded-md hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
					>
						Send
					</button>
				</form>
			)}
		</div>
	);
};

export default EmailForm;
