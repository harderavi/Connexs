


export const signin = async (req, res, next) => {
    try {
        res.json('working')

    } catch (err) {
        next(err)
    }
}