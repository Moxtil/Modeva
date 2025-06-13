import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export async function POST(req) {
  const { items } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel`,
  });

  return Response.json({ url: session.url });
}
