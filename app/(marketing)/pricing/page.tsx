/*
 * File Name:     page.tsx
 * Description:   Pricing page — thin orchestrator for the marketing pricing section.
 *                Replace with your own pricing components.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: PricingPage
 * Description:    Placeholder pricing page. Replace with your pricing components.
 */
export default function PricingPage() {
    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-3xl font-semibold text-foreground">Pricing</h1>
                <p className="text-lg text-muted-foreground">
                    Simple, transparent pricing for every team size.
                </p>
            </div>

            {/* Placeholder pricing cards — replace with your pricing feature */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                    { name: 'Free', price: '$0', features: ['1 user', '5 projects'] },
                    { name: 'Pro', price: '$29', features: ['10 users', 'Unlimited projects'] },
                    { name: 'Enterprise', price: 'Custom', features: ['Unlimited', 'Priority support'] },
                ].map(({ name, price, features }) => (
                    <div
                        key={name}
                        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-semibold text-foreground">
                                {name}
                            </span>
                            <span className="text-2xl font-semibold text-foreground">
                                {price}
                            </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {features.map((feature) => (
                                <li
                                    key={feature}
                                    className="text-sm text-muted-foreground"
                                >
                                    ✓ {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
