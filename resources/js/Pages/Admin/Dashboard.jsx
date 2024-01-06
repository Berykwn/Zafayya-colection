import ApplicationLogo from "@/Components/Elements/ApplicationLogo";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard({ auth }) {
    return (
        <AdminLayout auth={auth} title="Dashboard" page="dashboard">
            <section className="lg:px-4 md:px-2 px-0 lg:py-0 py-2">
                <h1 className="text-2xl font-semibold">Dashbaord</h1>
                <div className="lg:mt-2 mt-4 md:py-4 max-w-screen-xl">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div class="px-4 py-4 bg-white shadow rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam, magni?
                        </div>
                        <div class="px-4 py-4 bg-white shadow rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam, magni?
                        </div>
                        <div class="px-4 py-4 bg-white shadow rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam, magni?
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-8 md:p-12 my-4">
                        {/* <h1 className="text-gray-900 text-3xl md:text-4xl font-extrabold mb-2">
                            Zafayya Collection.
                        </h1> */}
                        <div className="flex gap-2 justify-center">
                            <ApplicationLogo className="w-16" />
                            <span className="mt-7 font-[cursive] text-sm">
                                Zaffaya. <br /> Collection
                            </span>
                        </div>
                        <p className="text-lg font-normal text-gray-500">
                            Where elegance meets style. Explore our exquisite
                            range of fashion and discover the perfect blend of
                            sophistication and trendsetting designs. We're
                            delighted to have you here on this journey of
                            timeless beauty. Happy shopping!
                        </p>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
