import { get } from 'https'
import { gethttp, posthttp, URL } from '../requests/Requests'

const ProfileInfo = ({ user }) => {
    const onLogOutClickButton = () => {
        gethttp(URL + "/api/logout").then(
            (res) => {
                window.open("/profile", "_self");
            }
        )
    }


    return (
        <section class="profileinfo" id="profileinfo">
            <div class="container">
                <div class="row">

                    <div class="d-flex flex-column justify-content-center ml-lg-auto mr-lg-5 col-lg-5 col-md-6 col-12">
                        <h2 class="mb-3 text-white" data-aos="fade-up">{user.username}</h2>

                        <p data-aos="fade-up" data-aos-delay="200"> {user.email}.</p>

                        <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={onLogOutClickButton}>Log Out</a>
                    </div>

                    <div class="mr-lg-auto mt-3 col-lg-4 col-md-6 col-12">
                        <div>
                            <div>

                                <h2 class="mb-4 text-white" data-aos="fade-up" data-aos-delay="500">welcome Back</h2>

                                <p data-aos="fade-up" data-aos-delay="800">edit your pictures heere</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const AddNewPic = () => {
    const createPic = () => {
        let title = document.getElementById("createpictitle").value
        let tags = document.getElementById("createpictag").value
        let descriptin = document.getElementById("createpicdesc").value
        let file = document.getElementById("createpicfile").files[0];
        if(file == undefined) {
            alert("choose a file")
            return
        }
        toBase64(file).then((imagefile) => {
            let data = { title, tags, descriptin, imagefile }
            posthttp(URL + "/api/addnewpic", data).then(
                (value) => {
                    if (value.status == 200) {
                        alert("created successfully")
                        window.open("/profile", "_self");
                    } else {
                        alert("error in creating: " + value.body.error);
                    }
                }
            )

        })
    }

    return (
        <section class="addpicsection" id="addpicsection">
            <div class="container">
                <div class="row">
                    <h2 class="text-white" data-aos="fade-up">Add New Picture</h2>
                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">title</span>
                        </div>
                        <input data-aos-delay="200" type="text" id="createpictitle" class="form-control" placeholder="name of picture" aria-label="name of picture" aria-describedby="basic-addon1"></input>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Tags</span>
                        </div>
                        <input data-aos-delay="200" type="text" id="createpictag" class="form-control" placeholder="tags for picture eg: #fasion , #art , #nature" aria-label="tags for picture eg: #fasion , #art , #nature" aria-describedby="basic-addon1"></input>
                    </div>


                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <textarea class="form-control" id="createpicdesc" rows="10" placeholder="add a description about picture" aria-label="add a description about picture"></textarea>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200" class="input-group mb-3">
                        <input data-aos-delay="200" type="file" class="form-control-file" id="createpicfile" ></input>
                    </div>


                    <a href="#" class="btn custom-btn bg-color mt-3" data-aos="fade-up" data-aos-delay="300" data-toggle="modal" onClick={createPic}>new post</a>

                </div>
            </div>
        </section >
    )
}

const GetMySongs = () => {
    /*
    gethttp(URL + "/api/getmysongs").then((res) => {
        alert(res.body.message)
    })
    */
    return (
        <section class="profilemysongs" id="profilemysongs">
            <p>salam</p>
        </section>
    )
}

export { ProfileInfo, AddNewPic as AddNewSong, GetMySongs }