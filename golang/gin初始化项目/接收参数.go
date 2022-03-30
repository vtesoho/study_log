buf := make([]byte, 1024)

n, _ := c.Request.Body.Read(buf)

parttyMap := common.JsonToMap(string(buf[0:n]))