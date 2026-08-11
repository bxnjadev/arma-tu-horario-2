class Fields {

    public static splitIfIsMajor(str : string, size : number) {
        if(str.length < size) {
            return str;
        }
        return str.slice(0, size);
    }

}