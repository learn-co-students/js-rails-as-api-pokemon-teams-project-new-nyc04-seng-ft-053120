class TrainerSerializer
   
    def initialize(trainer_obj)
        @trainer_obj = trainer_obj
    end

    def to_serialized_json
        @trainer_obj.to_json(include: {
            pokemons: {only: [:id, :nickname, :species]}
        })
    end
end