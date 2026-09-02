const [userRole, setUserRole] = useState("user");

useEffect(() => {
  const loadUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      setUserEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setUserRole(profile?.role || "user");
    }
  };

  loadUser();
}, []);
