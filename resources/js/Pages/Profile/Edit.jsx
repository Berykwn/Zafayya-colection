import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AdminLayout title="Profile" page="profile" auth={auth}>
            <section className="lg:px-4 px-0 lg:py-0 py-2">
                <h3 className="text-2xl font-semibold mb-4">
                    Edit profile
                </h3>
                <div className="lg:flex gap-4 mb-4">
                    <section className="bg-white rounded-md shadow-md px-6 py-4 mb-2 lg:w-1/2">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </section>

                    <section className="bg-white rounded-md shadow-md px-6 py-4 mb-2 lg:w-1/2">
                        <UpdatePasswordForm className="max-w-xl" />
                    </section>
                </div>

                <section className="bg-white rounded-md shadow-md px-6 py-4 lg:w-1/2">
                    <DeleteUserForm className="max-w-xl" />
                </section>
            </section>
        </AdminLayout>
    );
}
