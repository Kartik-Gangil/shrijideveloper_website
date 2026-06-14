import PropertyModel from "@/model/PropertyModel";
import UserModel from "@/model/User";
import { connectToDatabase } from "@/utils/mongo";


export async function GET() {
    try {
        await connectToDatabase();
        const plot = await PropertyModel.find();

        const user = await UserModel.find();

        return new Response(
            JSON.stringify({
                plot,
                PlotCount: plot.length,
                UsersCount: user.length,
                totalValue: plot.reduce(
                    (acc, item) => acc + Number(item.price || 0),
                    0
                ),
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return new Response("Failed to fetch dashboard data", { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        // console.log(id)

        if (!id) {
            return new Response("Property ID is required", { status: 400 });
        }

        const result = await PropertyModel.findByIdAndDelete(id);

        if (!result) {
            return new Response("Property not found", { status: 404 });
        }

        return new Response(
            JSON.stringify({ message: "Property deleted successfully" }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error deleting property:", error);
        return new Response("Failed to delete property", { status: 500 });
    }
} 