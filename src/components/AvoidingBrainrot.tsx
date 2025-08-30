import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Tv, Clock, Users } from "lucide-react";

const FAVOURITES = [
	{ type: "Book", name: "The Midnight Library" },
	{ type: "Show", name: "Severance" },
	{ type: "Book", name: "Atomic Habits" },
	{ type: "Show", name: "The Bear" },
	{ type: "Book", name: "Sapiens" },
	{ type: "Show", name: "The Expanse" },
];

const FRIENDS = [
	{ name: "Ava", online: true },
	{ name: "Maya", online: false },
	{ name: "Rohan", online: true },
	{ name: "Liam", online: false },
	{ name: "Noah", online: true },
];

const getRandomFavourite = () => FAVOURITES[Math.floor(Math.random() * FAVOURITES.length)];

const AvoidingBrainrot: React.FC = () => {
	const [minutes, setMinutes] = useState(0);
	const [popup, setPopup] = useState<string | null>(null);
	const [suggestion, setSuggestion] = useState(getRandomFavourite());
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		timerRef.current = setInterval(() => {
			setMinutes((m) => m + 10);
			setPopup(`⏰ ${minutes + 10} minutes have passed!`);
			setSuggestion(getRandomFavourite());
			setTimeout(() => setPopup(null), 5000);
		}, 600000); // 10 minutes
		return () => timerRef.current && clearInterval(timerRef.current);
		// eslint-disable-next-line
	}, [minutes]);

	return (
		<div className="min-h-screen p-6">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center gap-4 mb-8">
					{/* Back button */}
					<Button asChild variant="outline" size="sm" className="bg-card">
						<a href="/">
							<Clock className="w-4 h-4" />
						</a>
					</Button>
					<div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
							Avoiding Brainrot
						</h1>
						<p className="text-muted-foreground">
							Stay mindful of your time, get gentle reminders, and connect with friends while online.
						</p>
					</div>
				</div>
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="w-5 h-5 text-primary" />
							Time Awareness
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-2">You'll get a gentle popup every 10 minutes to remind you of time passing.</p>
						<p className="text-xs text-gray-400">Stay mindful of your time online!</p>
					</CardContent>
				</Card>
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BookOpen className="w-5 h-5 text-primary" />
							<Tv className="w-5 h-5 text-primary" />
							Suggestions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-2">You could be enjoying:</p>
						<div className="flex items-center gap-2 mb-2">
							{suggestion.type === "Book" ? <BookOpen className="w-4 h-4 text-primary" /> : <Tv className="w-4 h-4 text-primary" />}
							<span className="font-medium">{suggestion.name}</span>
						</div>
						<Button size="sm" variant="outline" onClick={() => setSuggestion(getRandomFavourite())}>
							New Suggestion
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Users className="w-5 h-5 text-primary" />
							Friends Online
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-3">
							{FRIENDS.filter((f) => f.online).length === 0 ? (
								<span className="text-muted-foreground">No friends online right now.</span>
							) : (
								FRIENDS.filter((f) => f.online).map((f) => (
									<div key={f.name} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
										<User className="w-4 h-4 text-green-500" />
										<span className="font-medium">{f.name}</span>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>
				{popup && (
					<div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-6 py-3 rounded-xl shadow-lg text-lg animate-fade-in">
						{popup}
					</div>
				)}
			</div>
		</div>
	);
};

export default AvoidingBrainrot;
